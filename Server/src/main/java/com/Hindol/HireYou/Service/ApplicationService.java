package com.Hindol.HireYou.Service;

import com.Hindol.HireYou.Entity.Application;
import com.Hindol.HireYou.Payload.ResponseDTO;
import com.Hindol.HireYou.Payload.UserApplicationDTO;

import java.util.List;

public interface ApplicationService {
    ResponseDTO updateApplicationStatus(String email, String role, Integer statusCode,Integer applicationId);
    UserApplicationDTO getUserApplication(String email, String role);
}
