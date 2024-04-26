package com.Hindol.HireYou.Service.Implementation;

import com.Hindol.HireYou.Entity.Listing;
import com.Hindol.HireYou.Entity.Organization;
import com.Hindol.HireYou.Payload.ListingDTO;
import com.Hindol.HireYou.Payload.OrganizationListingDTO;
import com.Hindol.HireYou.Payload.ResponseDTO;
import com.Hindol.HireYou.Repository.ListingRepository;
import com.Hindol.HireYou.Repository.OrganizationRepository;
import com.Hindol.HireYou.Service.ListingService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public ListingDTO getDetails(Integer listingId) {
        try {
            Listing listing = this.listingRepository.findById(listingId).orElseThrow(() -> new RuntimeException("Unable to fetch Course with ID " +  listingId));
            ListingDTO listingDTO = this.modelMapper.map(listing,ListingDTO.class);
            return listingDTO;
        }
        catch (Exception e) {
            log.error("An error occured while fetching details -", e);
            return null;
        }
    }

    @Override
    public OrganizationListingDTO getAllListingDetails(String email, String Role) {
        try {
            if(Role.equals("User")) {
                return new OrganizationListingDTO("You are not authorized.",false,List.of());
            }
            else {
                Organization organization = this.organizationRepository.findByEmail(email);
                if(organization != null) {
                    List<Listing> listingList = organization.getListingList();
                    List<ListingDTO> listingDTOS = listingList.stream().map(listing -> this.modelMapper.map(listing,ListingDTO.class)).collect(Collectors.toList());
                    return new OrganizationListingDTO("Successfully fetched all Listings",true,listingDTOS);
                }
                else {
                    return new OrganizationListingDTO("You are not registered as an Organization.",false,List.of());
                }
            }
        }
        catch (Exception e) {
            log.error("An error occured while fetching details -", e);
            return null;
        }
    }

    /* UTIL FOR SECURITY AND ENSURING ATOMICITY */
    @Transactional
    private void transactionalSave(Listing newListing,Organization organization) {
        this.listingRepository.save(newListing);
        this.organizationRepository.save(organization);
    }
}
