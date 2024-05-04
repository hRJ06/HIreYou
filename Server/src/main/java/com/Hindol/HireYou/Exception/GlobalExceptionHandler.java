package com.Hindol.HireYou.Exception;

import com.Hindol.HireYou.Payload.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseDTO> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
        String message = ex.getMessage();
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage(message);
        responseDTO.setSuccess(false);
        return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.NOT_FOUND);
    }
}
