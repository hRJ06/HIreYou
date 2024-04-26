package com.Hindol.HireYou.Entity;

import com.Hindol.HireYou.Entity.Enum.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne()
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;
    @ManyToOne()
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    /* RESUME */
    private String application;
    private Status status = Status.DUE;
    @CreationTimestamp
    private Date createdAt;
}
