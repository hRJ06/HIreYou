package com.Hindol.HireYou.Service.Implementation;

import com.Hindol.HireYou.Entity.Application;
import com.Hindol.HireYou.Entity.Enum.Status;
import com.Hindol.HireYou.Entity.Listing;
import com.Hindol.HireYou.Entity.Organization;
import com.Hindol.HireYou.Entity.User;
import com.Hindol.HireYou.Exception.ResourceNotFoundException;
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
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}") private String sender;
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
                    return new ResponseDTO("Successfully added the listing.",true);
                }
                else {
                    return new ResponseDTO("You are not registered as an Organization..",false);
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
            Listing listing = this.listingRepository.findById(listingId).orElseThrow(() -> new ResourceNotFoundException("Listing", "Id", listingId));
            ListingDTO listingDTO = this.modelMapper.map(listing,ListingDTO.class);
            return listingDTO;
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            log.error("An error occurred while fetching details - ", e);
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
            log.error("An error occurred while fetching details - ", e);
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
                    Listing listing = this.listingRepository.findById(listingId).orElseThrow(() -> new ResourceNotFoundException("Listing", "Id", listingId));
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
                    return new ResponseDTO("You are not registered as a User.",false);
                }
            }
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            log.error("An error occurred while adding application - ", e);
            return new ResponseDTO("Please Try Again",false);
        }
    }

    @Override
    public ListingApplicationDTO getApplicationForListing(String email, String role, Integer listingId) {
        try {
            if(role.equals("ORGANIZATION")) {
                Organization organization = this.organizationRepository.findByEmail(email);
                if(organization != null) {
                    Listing listing = this.listingRepository.findById(listingId).orElseThrow(() -> new ResourceNotFoundException("Listing", "Id", listingId));
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
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            log.error("An error occurred while fetching application - ", e);
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
            log.error("An error occurred while fetching listing - ", e);
            return List.of();
        }
    }

    @Override
    public List<ListingDTO> searchListing(String keyword) {
        try {
            List<Listing> listingList = this.listingRepository.search(keyword);
            List<ListingDTO> listingDTOS = listingList.stream().map(listing -> this.modelMapper.map(listing,ListingDTO.class)).collect(Collectors.toList());
            return listingDTOS;
        }
        catch (Exception e) {
            log.error("An error occurred while fetching listing - ", e);
            return List.of();
        }
    }

    @Override
    public ResponseDTO deleteListing(Integer listingId, String email, String role) {
        try {
            if(role.equals("USER")) {
                return new ResponseDTO("You are not authorized.",false);
            }
            else {
                Organization organization = this.organizationRepository.findByEmail(email);
                if(organization != null) {
                    Listing listing = this.listingRepository.findById(listingId).orElseThrow(() -> new ResourceNotFoundException("Listing","ID",listingId));
                    if(listing.getOrganization().equals(organization)) {
                        deleteListing(listing);
                        return new ResponseDTO("Successfully closed Listing.",true);
                    }
                    else {
                        return new ResponseDTO("You are authorized.",false);
                    }
                }
                else {
                    return new ResponseDTO("You are not registered with us.",false);
                }
            }
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            log.error("An error occurred while fetching listing - ", e);
            return new ResponseDTO("Please Try Again",false);
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
    @Transactional
    private void deleteListing(Listing listing) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,"utf-8");
        for(Application application : listing.getApplicationList()) {
            User appliedUser = application.getUser();
            String subject = "Listing Closed";
            String content = "<!DOCTYPE html>\n" +
                    "<html>\n" +
                    "<head>\n" +
                    "    <style>\n" +
                    "        body {\n" +
                    "            font-family: Arial, sans-serif;\n" +
                    "            line-height: 1.6;\n" +
                    "            color: #333;\n" +
                    "        }\n" +
                    "        .container {\n" +
                    "            max-width: 600px;\n" +
                    "            margin: 0 auto;\n" +
                    "            padding: 20px;\n" +
                    "            border: 1px solid #ddd;\n" +
                    "            border-radius: 5px;\n" +
                    "        }\n" +
                    "        h1 {\n" +
                    "            color: #333;\n" +
                    "        }\n" +
                    "        p {\n" +
                    "            margin-bottom: 20px;\n" +
                    "        }\n" +
                    "        .signature {\n" +
                    "            margin-top: 40px;\n" +
                    "            font-style: italic;\n" +
                    "        }\n" +
                    "    </style>\n" +
                    "    <title>Listing Closed</title>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "    <div class=\"container\">\n" +
                    "        <h1>Listing Closed</h1>\n" +
                    "        <p>Dear " + appliedUser.getFirstName() + " " + appliedUser.getLastName() + ",</p>\n" +
                    "        <p>We regret to inform you that the listing for " + listing.getPosition() + " by " + listing.getOrganization().getName() + " you applied for has been closed. We appreciate your interest and the time you invested in applying for this position.</p>\n" +
                    "        <p>Thank you for your patience throughout this process. Meanwhile, we encourage you to continue exploring other listings on our platform that match your interests and qualifications.</p>\n" +
                    "        <p>Please disregard this email if you have already been informed of the closure and have accepted another opportunity.</p>\n" +
                    "        <p>Thank you again for considering us. We wish you the best of luck in your job search.</p>\n" +
                    "        <p class=\"signature\">Sincerely,<br>Your HireYou Team</p>\n" +
                    "    </div>\n" +
                    "</body>\n" +
                    "</html>";
            helper.setFrom(sender);
            helper.setTo(appliedUser.getEmail());
            helper.setText(content,true);
            helper.setSubject(subject);
            javaMailSender.send(mimeMessage);
        }
        this.listingRepository.delete(listing);
    }
}
