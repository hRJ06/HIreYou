package com.Hindol.HireYou.Controller;

import com.Hindol.HireYou.Entity.User;
import com.Hindol.HireYou.Payload.LoginResponseDTO;
import com.Hindol.HireYou.Payload.TokenValidationResultDTO;
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
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody UserDTO userDTO) {
        LoginResponseDTO loginResponseDTO = this.userService.loginUser(userDTO);
        return new ResponseEntity<LoginResponseDTO>(loginResponseDTO,HttpStatus.OK);
    }
    @GetMapping("/my-details")
    public ResponseEntity<?> getDetails(@RequestHeader("Authorization") String bearerToken) {
        if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            UserDTO userDTO = this.userService.getDetails(token);
            return new ResponseEntity<UserDTO>(userDTO,HttpStatus.OK);
        }
        else {
            return ResponseEntity.badRequest().body("Provide a valid Token");
        }
    }
}
