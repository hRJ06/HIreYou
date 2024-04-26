package com.Hindol.HireYou.Service;

import com.Hindol.HireYou.Payload.ListingDTO;
import com.Hindol.HireYou.Payload.ResponseDTO;

public interface ListingService {
    ResponseDTO addListing(String email, String role, ListingDTO listingDTO);
}
