package com.Hindol.HireYou.Service;

import com.Hindol.HireYou.Payload.ResponseDTO;

public interface ApplicationService {
    ResponseDTO updateApplicationStatus(String email, String role, Integer statusCode,Integer applicationId);
}
