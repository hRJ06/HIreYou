package com.Hindol.HireYou.Controller;

import com.Hindol.HireYou.Payload.ResponseDTO;
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
    @GetMapping("/update/{applicationId}")
    public ResponseEntity<ResponseDTO> updateStatus(@RequestParam("status") Integer statusCode,@PathVariable Integer applicationId, HttpServletRequest request) {
        String email = (String) request.getAttribute("Email");
        String role = (String) request.getAttribute("Role");
        ResponseDTO responseDTO = this.applicationService.updateApplicationStatus(email,role,statusCode,applicationId);
        return new ResponseEntity<ResponseDTO>(responseDTO,responseDTO.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}
