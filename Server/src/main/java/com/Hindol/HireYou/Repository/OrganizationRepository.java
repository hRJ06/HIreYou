package com.Hindol.HireYou.Repository;

import com.Hindol.HireYou.Entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization,Integer> {
    Organization findByEmail(String email);
}
