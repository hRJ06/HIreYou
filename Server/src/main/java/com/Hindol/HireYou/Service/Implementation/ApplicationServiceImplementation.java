package com.Hindol.HireYou.Service.Implementation;

import com.Hindol.HireYou.Entity.Application;
import com.Hindol.HireYou.Entity.Enum.Status;
import com.Hindol.HireYou.Entity.Organization;
import com.Hindol.HireYou.Entity.User;
import com.Hindol.HireYou.Payload.ResponseDTO;
import com.Hindol.HireYou.Payload.UserApplicationDTO;
import com.Hindol.HireYou.Repository.ApplicationRepository;
import com.Hindol.HireYou.Repository.OrganizationRepository;
import com.Hindol.HireYou.Repository.UserRepository;
import com.Hindol.HireYou.Service.ApplicationService;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
public class ApplicationServiceImplementation implements ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}") private String sender;
    @Override
    public ResponseDTO updateApplicationStatus(String email , String role, Integer statusCode, Integer applicationId) {
        try {
            if(role.equals("USER")) {
                return new ResponseDTO("You are not authorized.",false);
            }
            Organization organization = this.organizationRepository.findByEmail(email);
            if(organization != null) {
                if(statusCode > 2 || statusCode < 0) {
                    return new ResponseDTO("Please provide a valid code.",false);
                }
                else {
                    Application application = this.applicationRepository.findById(applicationId).orElseThrow(() -> new RuntimeException("Unable to find Application with ID " + applicationId));
                    if(application.getStatus() != Status.DUE) {
                        return new ResponseDTO("You can't change Application Status now.",false);
                    }
                    this.updateApplication(statusCode,application);
                    return new ResponseDTO("Successfully Updated Application",true);
                }
            }
            else {
                return new ResponseDTO("You are not registered with us.", false);
            }
        }
        catch (Exception e) {
            log.error("An error occurred while updating application status - ", e);
            return new ResponseDTO("Please Try Again Later.",false);
        }
    }

    @Override
    public UserApplicationDTO getUserApplication(String email, String role) {
        try {
            if(role.equals("USER")) {
                User user  = this.userRepository.findByEmail(email);
                if(user != null) {
                    List<Application> applicationList = this.applicationRepository.findByUser(user);
                    Comparator<Application> comparator = Comparator.comparing(Application::getCreatedAt).reversed();
                    Collections.sort(applicationList,comparator);
                    return new UserApplicationDTO(true,"Successfully fetched all applications",applicationList);
                }
                else {
                    return new UserApplicationDTO(false,"You are not registered with us.",List.of());
                }

            }
            else {
                return new UserApplicationDTO(false,"You are not authorized",List.of());
            }
        }
        catch (Exception e) {
            log.error("An error occurred while fetching user applications - ",e);
            return new UserApplicationDTO(false,"Please Try Again Later",List.of());
        }
    }

    @Override
    public ResponseDTO withdrawApplication(String email, String role, Integer applicationId) {
        try {
            if(role.equals("USER")) {
                User user = this.userRepository.findByEmail(email);
                if(user != null) {
                    Application application = this.applicationRepository.findById(applicationId).orElseThrow(() -> new RuntimeException("Unable to find Application with ID " + applicationId));
                    if(application.getUser().equals(user)) {
                        if(application.getStatus() != Status.DUE) {
                            return new ResponseDTO("You are not allowed to withdraw now.",false);
                        }
                        else {
                            this.applicationRepository.delete(application);
                            return new ResponseDTO("Successfully withdraw application.",true);
                        }
                    }
                    else {
                        return new ResponseDTO("You are not authorized.",false);
                    }
                }
                else {
                    return new ResponseDTO("You are not registered.",false);
                }
            }
            else  {
                return new ResponseDTO("You are not authorized.",false);
            }

        }
        catch (Exception e) {
            log.error("An error occurred while withdrawing application - ", e);
            return new ResponseDTO("Please Try Again Later.",false);
        }
    }

    @Transactional
    private void updateApplication(Integer statusCode,Application application) {
        try {
            application.setStatus(statusCode != 0 ? Status.REJECTED : Status.ACCEPTED);
            this.applicationRepository.save(application);
            User user = application.getUser();
            Organization organization = application.getListing().getOrganization();
            String subject = "";
            String content = "";
            if(statusCode != 2) {
                subject = "Application Accepted";
                content = String.format(
                        "<!DOCTYPE html>"
                                + "<html lang=\"en\">"
                                + "<head>"
                                + "<meta charset=\"UTF-8\">"
                                + "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">"
                                + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                                + "<title>Application Accepted</title>"
                                + "<style>"
                                + "body {"
                                + "    font-family: Arial, sans-serif;"
                                + "    background-color: #f4f4f4;"
                                + "    margin: 0;"
                                + "    padding: 0;"
                                + "}"
                                + ".container {"
                                + "    max-width: 600px;"
                                + "    margin: 0 auto;"
                                + "    padding: 20px;"
                                + "    background-color: #ffffff;"
                                + "    border-radius: 5px;"
                                + "    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);"
                                + "}"
                                + "h1 {"
                                + "    color: #333333;"
                                + "}"
                                + "p {"
                                + "    color: #666666;"
                                + "}"
                                + "</style>"
                                + "</head>"
                                + "<body>"
                                + "<div class=\"container\">"
                                + "<h1>Dear %s %s,</h1>"
                                + "<p>Your application for %s has been accepted by %s. "
                                + "We have forwarded the application to them. They will reach out to you shortly.</p>"
                                + "<p>In case of any queries, please feel free to reach out to us at <a href=\"mailto:query@hireyou.com\">query@hireyou.com</a>.</p>"
                                + "</div>"
                                + "</body>"
                                + "</html>",
                                user.getFirstName(), user.getLastName(), application.getListing().getPosition(), organization.getName()
                );
            }
            else {
                subject = "Application Rejected";
                content = String.format(
                        "<!DOCTYPE html>"
                                + "<html lang=\"en\">"
                                + "<head>"
                                + "<meta charset=\"UTF-8\">"
                                + "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">"
                                + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                                + "<title>Application Rejected</title>"
                                + "<style>"
                                + "body {"
                                + "    font-family: Arial, sans-serif;"
                                + "    background-color: #f4f4f4;"
                                + "    margin: 0;"
                                + "    padding: 0;"
                                + "}"
                                + ".container {"
                                + "    max-width: 600px;"
                                + "    margin: 0 auto;"
                                + "    padding: 20px;"
                                + "    background-color: #ffffff;"
                                + "    border-radius: 5px;"
                                + "    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);"
                                + "}"
                                + "h1 {"
                                + "    color: #333333;"
                                + "}"
                                + "p {"
                                + "    color: #666666;"
                                + "}"
                                + "</style>"
                                + "</head>"
                                + "<body>"
                                + "<div class=\"container\">"
                                + "<h1>Dear %s %s,</h1>"
                                + "<p>We regret to inform you that your application for %s to %s has been rejected. "
                                + "If you have any further questions, please contact us at <a href=\"mailto:query@hireyou.com\">query@hireyou.com</a>.</p>"
                                + "</div>"
                                + "</body>"
                                + "</html>",
                        user.getFirstName(), user.getLastName(), application.getListing().getPosition(), organization.getName()
                );
            }
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,"utf-8");
            helper.setFrom(sender);
            helper.setTo(user.getEmail());
            helper.setText(content,true);
            helper.setSubject(subject);
            javaMailSender.send(mimeMessage);
        }
        catch (Exception e) {
            log.error("An Exception occurred - ", e);
        }
    }
}
