package com.Hindol.HireYou.Service.Implementation;

import com.Hindol.HireYou.Entity.User;
import com.Hindol.HireYou.Payload.UserDTO;
import com.Hindol.HireYou.Repository.UserRepository;
import com.Hindol.HireYou.Service.UserService;
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
}
