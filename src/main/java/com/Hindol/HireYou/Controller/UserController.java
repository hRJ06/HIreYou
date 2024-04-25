package com.Hindol.HireYou.Controller;

import com.Hindol.HireYou.Payload.UserDTO;
import com.Hindol.HireYou.Service.UserService;
import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestParam("file")MultipartFile file,@RequestParam("firstName") String firstName,@RequestParam("lastName") String lastName,@RequestParam("email") String email,@RequestParam("password") String password,@RequestParam("collegeName") String collegeName,@RequestParam("address") String address) {
        UserDTO requestDTO = new UserDTO();
        requestDTO.setFirstName(firstName);
        requestDTO.setLastName(lastName);
        requestDTO.setEmail(email);
        requestDTO.setPassword(password);
        requestDTO.setCollegeName(collegeName);
        requestDTO.setAddress(address);
        UserDTO savedUserDTO = this.userService.registerUser(requestDTO,file);
        if(savedUserDTO != null) {
            return new ResponseEntity<UserDTO>(savedUserDTO, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<UserDTO>(savedUserDTO, HttpStatus.BAD_REQUEST);
        }
    }
}
