package com.Hindol.HireYou.Service.Implementation;

import com.Hindol.HireYou.Entity.Listing;
import com.Hindol.HireYou.Entity.Organization;
import com.Hindol.HireYou.Payload.ListingDTO;
import com.Hindol.HireYou.Payload.ResponseDTO;
import com.Hindol.HireYou.Repository.ListingRepository;
import com.Hindol.HireYou.Repository.OrganizationRepository;
import com.Hindol.HireYou.Service.ListingService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ListingServiceImplementation implements ListingService {
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private ListingRepository listingRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public ResponseDTO addListing(String email, String role, ListingDTO listingDTO) {
        try {
            if(role.equals("USER")) {
                return new ResponseDTO("You need to be an Organization to add a listing.",false);
            }
            else {
                /* AUTHORIZED */
                Organization organization = this.organizationRepository.findByEmail(email);
                if(organization != null) {
                    /* VALID */
                    Listing newListing = this.modelMapper.map(listingDTO,Listing.class);
                    /* SET ORGANIZATION */
                    newListing.setOrganization(organization);
                    /* ADD TO ORGANIZATION LISTING */
                    organization.getListingList().add(newListing);
                    /* TRANSACTION */
                    transactionalSave(newListing,organization);
                    return new ResponseDTO("Successfully added the listing",true);
                }
                else {
                    return new ResponseDTO("You are not authorized to add a listing.",false);
                }
            }
        }
        catch (Exception e) {
            log.error("An error occurred while adding a listing - ", e);
            return new ResponseDTO("Please Try Again later",false);
        }
    }
    /* UTIL FOR SECURITY AND ENSURING ATOMICITY */
    @Transactional
    private void transactionalSave(Listing newListing,Organization organization) {
        this.listingRepository.save(newListing);
        this.organizationRepository.save(organization);
    }
}
