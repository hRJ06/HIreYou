package com.Hindol.HireYou.Repository;

import com.Hindol.HireYou.Entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingRepository extends JpaRepository<Listing,Integer> {
}
