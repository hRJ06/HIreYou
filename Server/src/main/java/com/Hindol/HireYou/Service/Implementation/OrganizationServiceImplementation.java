package com.Hindol.HireYou.Service.Implementation;

import com.Hindol.HireYou.Entity.Enum.Role;
import com.Hindol.HireYou.Entity.Organization;
import com.Hindol.HireYou.Entity.Review;
import com.Hindol.HireYou.Entity.User;
import com.Hindol.HireYou.Exception.ResourceNotFoundException;
import com.Hindol.HireYou.Payload.*;
import com.Hindol.HireYou.Repository.OrganizationRepository;
import com.Hindol.HireYou.Repository.ReviewRepository;
import com.Hindol.HireYou.Repository.UserRepository;
import com.Hindol.HireYou.Service.OrganizationService;
import com.Hindol.HireYou.Util.JWTToken;
import com.cloudinary.Cloudinary;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@Service
public class OrganizationServiceImplementation implements OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private JWTToken jwtToken;
    @Override
    public OrganizationDTO registerOrganization(OrganizationDTO organizationDTO, MultipartFile file) {
        try {
            Organization organization = this.organizationRepository.findByEmail(organizationDTO.getEmail());
            if(organization != null) {
                return null;
            }
            else {
                /*  HASHED PASSWORD */
                String hashedPassword = this.bCryptPasswordEncoder.encode(organizationDTO.getPassword());
                /* UPLOAD FILE */
                Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
                String uploadedLink = (String) data.get("secure_url");
                /* HASH PASSWORD */
                organizationDTO.setPassword(hashedPassword);
                organizationDTO.setImage(uploadedLink);
                /* SET ROLE */
                organizationDTO.setRole(Role.ORGANIZATION);
                Organization savedOrganization = this.modelMapper.map(organizationDTO,Organization.class);
                this.organizationRepository.save(savedOrganization);
                OrganizationDTO savedOrganizationDTO = this.modelMapper.map(savedOrganization, OrganizationDTO.class);
                /* SECURITY PURPOSE */
                savedOrganizationDTO.setPassword(null);
                return savedOrganizationDTO;
            }
        }
        catch (Exception e) {
            log.warn("Failure in Registering Organization");
            return null;
        }
    }

    @Override
    public LoginResponseDTO loginOrganization(OrganizationDTO organizationDTO) {
        Organization exisitingOrganization = this.organizationRepository.findByEmail(organizationDTO.getEmail());
        if(exisitingOrganization != null) {
            if(bCryptPasswordEncoder.matches(organizationDTO.getPassword(), exisitingOrganization.getPassword())) {
                String token = this.jwtToken.generateToken(exisitingOrganization);
                LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
                loginResponseDTO.setName(exisitingOrganization.getName());
                loginResponseDTO.setToken(token);
                loginResponseDTO.setMessage("Login Success");
                loginResponseDTO.setRole(exisitingOrganization.getRole().toString());
                return loginResponseDTO;
            }
            else {
                LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
                loginResponseDTO.setToken(null);
                loginResponseDTO.setMessage("Login Failure");
                loginResponseDTO.setRole(null);
                return loginResponseDTO;
            }
        }
        else {
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
            loginResponseDTO.setToken(null);
            loginResponseDTO.setMessage("Login Failure");
            loginResponseDTO.setRole(null);
            return loginResponseDTO;
        }
    }

    @Override
    public OrganizationDTO getDetails(String token,Integer organizationId) {
        try {
            TokenValidationResultDTO tokenValidationResultDTO = this.jwtToken.verifyToken(token);
            if("Expired Token".equals(tokenValidationResultDTO.getResult()) || "Invalid Token".equals(tokenValidationResultDTO.getResult())) {
                return null;
            }
            else {
                Organization organization = this.organizationRepository.findById(organizationId).orElseThrow(() -> new ResourceNotFoundException("Organization", "Id", organizationId));
                if(organization != null) {
                    OrganizationDTO organizationDTO = this.modelMapper.map(organization, OrganizationDTO.class);
                    /* SECURITY PURPOSE */
                    organizationDTO.setPassword(null);
                    return organizationDTO;
                }
                else {
                    return null;
                }

            }
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    @Override
    public ResponseDTO addReview(String token, Integer organizationId, ReviewDTO reviewDTO) {
        try {
            TokenValidationResultDTO tokenValidationResultDTO = this.jwtToken.verifyToken(token);
            if("Expired Token".equals(tokenValidationResultDTO.getResult()) || "Invalid Token".equals(tokenValidationResultDTO.getResult())) {
                return new ResponseDTO("Expired Token or Invalid Token",false);
            }
            else {
                Organization organization = this.organizationRepository.findById(organizationId).orElseThrow(() -> new ResourceNotFoundException("Organization", "Id", organizationId));
                Review review = this.modelMapper.map(reviewDTO,Review.class);
                if(tokenValidationResultDTO.getRole().equals("USER")) {
                    User user = this.userRepository.findByEmail(tokenValidationResultDTO.getEmail());
                    if(user != null) {
                        review.setUser(user);
                        review.setOrganization(organization);
                        transactionSave(review,organization);
                        return new ResponseDTO("Successfully added Review.",true);
                    }
                    else {
                        return new ResponseDTO("You are not registered with us.",false);
                    }
                }
                else {
                    return new ResponseDTO("You are not authorized",false);
                }
            }
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseDTO("Please Try Again",false);
        }
    }
    @Transactional
    private void transactionSave(Review review,Organization organization) {
        Review savedReview = this.reviewRepository.save(review);
        organization.getReviewList().add(savedReview);
        this.organizationRepository.save(organization);
    }
}