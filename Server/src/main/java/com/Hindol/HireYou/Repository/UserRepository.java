package com.Hindol.HireYou.Repository;

import com.Hindol.HireYou.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findByEmail(String email);
}
