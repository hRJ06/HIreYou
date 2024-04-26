package com.Hindol.HireYou.Repository;

import com.Hindol.HireYou.Entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application,Integer> {
}
