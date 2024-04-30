package com.Hindol.HireYou.Repository;

import com.Hindol.HireYou.Entity.Application;
import com.Hindol.HireYou.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application,Integer> {
    List<Application> findByUser(User user);
}
