package com.Hindol.HireYou.Service.Implementation;

import com.Hindol.HireYou.Entity.Enum.Role;
import com.Hindol.HireYou.Entity.Organization;
import com.Hindol.HireYou.Entity.User;
import com.Hindol.HireYou.Payload.LoginResponseDTO;
import com.Hindol.HireYou.Payload.OrganizationDTO;
import com.Hindol.HireYou.Payload.TokenValidationResultDTO;
import com.Hindol.HireYou.Payload.UserDTO;
import com.Hindol.HireYou.Repository.OrganizationRepository;
import com.Hindol.HireYou.Service.OrganizationService;
import com.Hindol.HireYou.Util.JWTToken;
import com.cloudinary.Cloudinary;
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
    public OrganizationDTO getDetails(String token) {
        try {
            TokenValidationResultDTO tokenValidationResultDTO = this.jwtToken.verifyToken(token);
            if("Expired Token".equals(tokenValidationResultDTO.getResult()) || "Invalid Token".equals(tokenValidationResultDTO.getResult())) {
                return null;
            }
            else {
                String email = tokenValidationResultDTO.getEmail();
                Organization organization = this.organizationRepository.findByEmail(email);
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
        catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }
}
