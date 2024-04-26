package com.Hindol.HireYou.Service;

import com.Hindol.HireYou.Payload.LoginResponseDTO;
import com.Hindol.HireYou.Payload.OrganizationDTO;
import org.springframework.web.multipart.MultipartFile;

public interface OrganizationService {
    OrganizationDTO registerOrganization(OrganizationDTO organizationDTO, MultipartFile file);
    LoginResponseDTO loginOrganization(OrganizationDTO organizationDTO);
    OrganizationDTO getDetails(String token);
}
