package com.Hindol.HireYou.Controller;

import com.Hindol.HireYou.Entity.Application;
import com.Hindol.HireYou.Payload.ListingApplicationDTO;
import com.Hindol.HireYou.Payload.ListingDTO;
import com.Hindol.HireYou.Payload.OrganizationListingDTO;
import com.Hindol.HireYou.Payload.ResponseDTO;
import com.Hindol.HireYou.Service.ListingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/listing")
public class ListingController {
    @Autowired
    private ListingService listingService;
    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> addListing(HttpServletRequest request,@RequestBody ListingDTO listingDTO) {
        String email = (String) request.getAttribute("Email");
        String role = (String) request.getAttribute("Role");
        ResponseDTO responseDTO = this.listingService.addListing(email, role, listingDTO);
        return new ResponseEntity<ResponseDTO>(responseDTO,responseDTO.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/details/{listingId}")
    public ResponseEntity<ListingDTO> getListingDetails(@PathVariable Integer listingId) {
        ListingDTO listingDTO = this.listingService.getDetails(listingId);
        return new ResponseEntity<ListingDTO>(listingDTO,listingDTO != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/my-detail")
    public ResponseEntity<OrganizationListingDTO> getAllListings(HttpServletRequest request) {
        String email = (String) request.getAttribute("Email");
        String role = (String) request.getAttribute("Role");
        OrganizationListingDTO organizationListingDTO = this.listingService.getAllListingDetails(email,role);
        return new ResponseEntity<OrganizationListingDTO>(organizationListingDTO,organizationListingDTO.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/add-application/{listingId}")
    public ResponseEntity<ResponseDTO> addApplication(HttpServletRequest request, @PathVariable Integer listingId, @RequestParam("file") MultipartFile application) {
        String email = (String) request.getAttribute("Email");
        String role = (String) request.getAttribute("Role");
        ResponseDTO responseDTO = this.listingService.addApplication(listingId,application,email,role);
        return new ResponseEntity<ResponseDTO>(responseDTO,responseDTO.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/get-application/{listingId}")
    public ResponseEntity<ListingApplicationDTO> getApplicationForListing(HttpServletRequest request,@PathVariable Integer listingId) {
        String email = (String) request.getAttribute("Email");
        String role = (String) request.getAttribute("Role");
        ListingApplicationDTO listingApplicationDTO = this.listingService.getApplicationForListing(email,role,listingId);
        return new ResponseEntity<ListingApplicationDTO>(listingApplicationDTO,listingApplicationDTO.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}
