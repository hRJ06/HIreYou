package com.Hindol.HireYou.Service;

import com.Hindol.HireYou.Payload.ListingApplicationDTO;
import com.Hindol.HireYou.Payload.ListingDTO;
import com.Hindol.HireYou.Payload.OrganizationListingDTO;
import com.Hindol.HireYou.Payload.ResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ListingService {
    ResponseDTO addListing(String email, String role, ListingDTO listingDTO);
    ListingDTO getDetails(Integer listingId);
    OrganizationListingDTO getAllListingDetails(String email, String Role);
    ResponseDTO addApplication(Integer listingId, MultipartFile file,String email,String role);
    ListingApplicationDTO getApplicationForListing(String email,String role,Integer listingId);
    List<ListingDTO> getAllListings();
}
