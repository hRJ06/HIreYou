package com.Hindol.HireYou.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrganizationListingDTO {
    private String message;
    private Boolean success;
    private List<ListingDTO> listingDTOS;
}
