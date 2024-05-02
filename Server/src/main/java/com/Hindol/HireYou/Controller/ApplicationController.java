package com.Hindol.HireYou.Controller;

import com.Hindol.HireYou.Payload.ResponseDTO;
import com.Hindol.HireYou.Payload.UserApplicationDTO;
import com.Hindol.HireYou.Service.ApplicationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/application")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;
    @PutMapping("/update/{applicationId}")
    public ResponseEntity<ResponseDTO> updateStatus(@RequestParam("status") Integer statusCode,@PathVariable Integer applicationId, HttpServletRequest request) {
        String email = (String) request.getAttribute("Email");
        String role = (String) request.getAttribute("Role");
        ResponseDTO responseDTO = this.applicationService.updateApplicationStatus(email,role,statusCode,applicationId);
        return new ResponseEntity<ResponseDTO>(responseDTO,responseDTO.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/get-application")
    public ResponseEntity<UserApplicationDTO> getUserApplications(HttpServletRequest request) {
        String email = (String) request.getAttribute("Email");
        String role = (String) request.getAttribute("Role");
        UserApplicationDTO userApplicationDTO = this.applicationService.getUserApplication(email,role);
        return new ResponseEntity<UserApplicationDTO>(userApplicationDTO,userApplicationDTO.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/withdraw-application/{applicationId}")
    public ResponseEntity<ResponseDTO> withdrawApplication(HttpServletRequest request,@PathVariable Integer applicationId) {
        String email = (String) request.getAttribute("Email");
        String role = (String) request.getAttribute("Role");
        ResponseDTO responseDTO = this.applicationService.withdrawApplication(email,role,applicationId);
        return new ResponseEntity<ResponseDTO>(responseDTO,responseDTO.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}