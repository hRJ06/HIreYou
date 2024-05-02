package com.Hindol.HireYou.Service.Implementation;

import com.Hindol.HireYou.Entity.Application;
import com.Hindol.HireYou.Entity.Listing;
import com.Hindol.HireYou.Entity.Organization;
import com.Hindol.HireYou.Entity.User;
import com.Hindol.HireYou.Payload.ListingApplicationDTO;
import com.Hindol.HireYou.Payload.ListingDTO;
import com.Hindol.HireYou.Payload.OrganizationListingDTO;
import com.Hindol.HireYou.Payload.ResponseDTO;
import com.Hindol.HireYou.Repository.ApplicationRepository;
import com.Hindol.HireYou.Repository.ListingRepository;
import com.Hindol.HireYou.Repository.OrganizationRepository;
import com.Hindol.HireYou.Repository.UserRepository;
import com.Hindol.HireYou.Service.ListingService;
import com.cloudinary.Cloudinary;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ListingServiceImplementation implements ListingService {
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private ListingRepository listingRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private Cloudinary cloudinary;
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

    @Override
    public ResponseDTO addApplication(Integer listingId, MultipartFile file, String email, String role) {
        try {
            if(role.equals("ORGANIZATION")) {
                return new ResponseDTO("You are not authorized",false);
            }
            else {
                /* APPLICANT */
                User user = this.userRepository.findByEmail(email);
                if(user != null) {
                    Listing listing = this.listingRepository.findById(listingId).orElseThrow(() -> new RuntimeException("Unable to find Listing with ID " + listingId));
                    Map data = this.cloudinary.uploader().upload(file.getBytes(),Map.of());
                    String uploadedLink = (String) data.get("secure_url");
                    /* CREATE AN APPLICATION */
                    Application application = new Application();
                    application.setUser(user);
                    application.setListing(listing);
                    application.setApplication(uploadedLink);
                    /* SAVE IN DB */
                    addApplication(application,user,listing);
                    return new ResponseDTO("Successfully added Application",true);
                }
                else {
                    return new ResponseDTO("You need to register first.",false);
                }
            }
        }
        catch (Exception e) {
            log.error("An error occured while adding application - ", e);
            return new ResponseDTO("Please Try Again",false);
        }
    }

    @Override
    public ListingApplicationDTO getApplicationForListing(String email, String role, Integer listingId) {
        try {
            if(role.equals("ORGANIZATION")) {
                Organization organization = this.organizationRepository.findByEmail(email);
                if(organization != null) {
                    Listing listing = this.listingRepository.findById(listingId).orElseThrow(() -> new RuntimeException("Unable to find Listing with ID " + listingId));
                    if(listing.getOrganization().equals(organization)) {
                        List<Application> applicationList = listing.getApplicationList();
                        return new ListingApplicationDTO("Successfully fetched all Applications",true,applicationList);
                    }
                    else {
                        return new ListingApplicationDTO("This is not your listing",false,List.of());
                    }
                }
                else {
                    return new ListingApplicationDTO("You are not registered with us.",false,List.of());
                }
            }
            else {
                return new ListingApplicationDTO("You are not authorized.",false,List.of());
            }
        }
        catch (Exception e) {
            log.error("An error occured while fetching application - ", e);
            return new ListingApplicationDTO("Please Try Again",false,List.of());
        }
    }

    @Override
    public List<ListingDTO> getAllListings() {
        try {
            List<Listing> listingList = this.listingRepository.findAll();
            List<ListingDTO> listingDTOS = listingList.stream().map(listing -> this.modelMapper.map(listing,ListingDTO.class)).collect(Collectors.toList());

            return listingDTOS;
        }
        catch (Exception e) {
            log.error("An error occured while fetching listing - ", e);
            return List.of();
        }
    }

    /* UTIL FOR SECURITY AND ENSURING ATOMICITY */
    @Transactional
    private void transactionalSave(Listing newListing,Organization organization) {
        this.listingRepository.save(newListing);
        this.organizationRepository.save(organization);
    }
    @Transactional
    private void addApplication(Application application,User user,Listing listing) {
        Application savedApplication = this.applicationRepository.save(application);
        user.getApplicationList().add(savedApplication);
        listing.getApplicationList().add(savedApplication);
        this.userRepository.save(user);
        this.listingRepository.save(listing);
    }
}
