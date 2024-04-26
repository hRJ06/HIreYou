package com.Hindol.HireYou.Payload;

import com.Hindol.HireYou.Entity.Application;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListingApplicationDTO {
    private String message;
    private Boolean success;
    private List<Application> applicationList;
}
