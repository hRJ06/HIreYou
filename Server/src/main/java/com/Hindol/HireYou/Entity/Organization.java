package com.Hindol.HireYou.Entity;

import com.Hindol.HireYou.Entity.Enum.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "organization")
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String website;
    private Role role;
    private String location;
    private String image;
    @JsonIgnore
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    private List<Listing> listingList;
}
