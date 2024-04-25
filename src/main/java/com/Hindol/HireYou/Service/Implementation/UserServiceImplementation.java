package com.Hindol.HireYou.Service.Implementation;

import com.Hindol.HireYou.Entity.Enum.Role;
import com.Hindol.HireYou.Entity.User;
import com.Hindol.HireYou.Payload.LoginResponseDTO;
import com.Hindol.HireYou.Payload.UserDTO;
import com.Hindol.HireYou.Repository.UserRepository;
import com.Hindol.HireYou.Service.UserService;
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
public class UserServiceImplementation implements UserService {
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private JWTToken jwtToken;
    @Override
    public UserDTO registerUser(UserDTO userDTO, MultipartFile file) {
        try {
            String email = userDTO.getEmail();
            User existingUser = this.userRepository.findByEmail(email);
            if(existingUser != null) {
                return null;
            }
            else {

                /* HASH PASSWORD */
                String hashedPassword = this.bCryptPasswordEncoder.encode(userDTO.getPassword());
                /* UPLOAD IMAGE */
                Map data = this.cloudinary.uploader().upload(file.getBytes(),Map.of());
                String uploadedLink = (String) data.get("secure_url");
                userDTO.setPassword(hashedPassword);
                userDTO.setImage(uploadedLink);
                User user = this.modelMapper.map(userDTO,User.class);
                /* SET ROLE */
                user.setRole(Role.USER);
                this.userRepository.save(user);
                UserDTO savedUserDTO = this.modelMapper.map(userDTO,UserDTO.class);
                /* SECURITY */
                savedUserDTO.setPassword(null);
                return savedUserDTO;
            }
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }

    }

    @Override
    public LoginResponseDTO loginUser(UserDTO userDTO) {
        User exisitingUser = this.userRepository.findByEmail(userDTO.getEmail());
        if(exisitingUser != null) {
            if(bCryptPasswordEncoder.matches(userDTO.getPassword(),exisitingUser.getPassword())) {
                String token = this.jwtToken.generateToken(exisitingUser);
                LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
                loginResponseDTO.setToken(token);
                loginResponseDTO.setMessage("Login Success");
                loginResponseDTO.setRole(exisitingUser.getRole().toString());
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
}
