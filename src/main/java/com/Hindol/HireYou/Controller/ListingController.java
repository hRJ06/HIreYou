package com.Hindol.HireYou.Controller;

import com.Hindol.HireYou.Payload.ListingDTO;
import com.Hindol.HireYou.Payload.OrganizationListingDTO;
import com.Hindol.HireYou.Payload.ResponseDTO;
import com.Hindol.HireYou.Service.ListingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
