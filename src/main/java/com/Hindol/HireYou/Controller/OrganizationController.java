package com.Hindol.HireYou.Controller;

import com.Hindol.HireYou.Payload.LoginResponseDTO;
import com.Hindol.HireYou.Payload.OrganizationDTO;
import com.Hindol.HireYou.Service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/organization")
@CrossOrigin("*")
public class OrganizationController {
    @Autowired
    private OrganizationService organizationService;
    @PostMapping("/register")
    public ResponseEntity<OrganizationDTO> registerOrganization(@RequestParam("file") MultipartFile file,@RequestParam("name") String name,@RequestParam("website") String website,@RequestParam("email") String email,@RequestParam("password") String password,@RequestParam("location") String location) {
        OrganizationDTO organizationDTO = new OrganizationDTO();
        organizationDTO.setName(name);
        organizationDTO.setEmail(email);
        organizationDTO.setWebsite(website);
        organizationDTO.setPassword(password);
        organizationDTO.setLocation(location);
        OrganizationDTO savedOrganizationDTO = this.organizationService.registerOrganization(organizationDTO,file);
        if(savedOrganizationDTO != null) {
            return new ResponseEntity<OrganizationDTO>(savedOrganizationDTO, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<OrganizationDTO>(savedOrganizationDTO, HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginOrganization(@RequestBody OrganizationDTO organizationDTO) {
        LoginResponseDTO loginResponseDTO = this.organizationService.loginOrganization(organizationDTO);
        return new ResponseEntity<LoginResponseDTO>(loginResponseDTO,HttpStatus.OK);
    }
}
