package com.Hindol.HireYou.Repository;

import com.Hindol.HireYou.Entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListingRepository extends JpaRepository<Listing,Integer> {
    @Query("SELECT l FROM Listing l JOIN l.organization o WHERE " +
            "l.position LIKE %:keyword% OR " +
            "l.about LIKE %:keyword% OR " +
            "o.name LIKE %:keyword%")
    List<Listing> search(@Param("keyword") String keyword);
}
