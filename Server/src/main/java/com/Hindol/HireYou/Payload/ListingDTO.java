package com.Hindol.HireYou.Payload;

import com.Hindol.HireYou.Entity.Organization;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListingDTO {
    private Integer id;
    private String position;
    private String about;
    private List<String> rolesResponsibility;
    private List<String> skills;
    private String salary;
    private Organization organization;
}
