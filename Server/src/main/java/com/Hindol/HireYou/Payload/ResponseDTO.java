package com.Hindol.HireYou.Payload;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {
    private String message;
    private Boolean success;
}
