package com.Hindol.HireYou.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenValidationResultDTO {
    private String email;
    private String role;
    private String result;
}
