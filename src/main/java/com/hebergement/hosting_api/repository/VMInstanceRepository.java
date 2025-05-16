package com.hebergement.hosting_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hebergement.hosting_api.model.User;
import com.hebergement.hosting_api.model.VMInstance;

public interface VMInstanceRepository extends JpaRepository<VMInstance, Long> {
    List<VMInstance> findByUser(User user);
}
