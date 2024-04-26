package com.Hindol.HireYou.Payload;

import com.Hindol.HireYou.Entity.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrganizationDTO {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String website;
    private Role role;
    private String location;
    private String image;
}
