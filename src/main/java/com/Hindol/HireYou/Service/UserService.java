package com.Hindol.HireYou.Service;

import com.Hindol.HireYou.Payload.LoginResponseDTO;
import com.Hindol.HireYou.Payload.UserDTO;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO, MultipartFile file);
    LoginResponseDTO loginUser(UserDTO userDTO);
}
