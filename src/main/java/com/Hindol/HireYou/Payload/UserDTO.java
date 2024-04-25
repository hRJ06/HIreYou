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
public class UserDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private String password;
    private String image;
    private String collegeName;
    private String address;
}
