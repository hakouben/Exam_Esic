package com.hebergement.hosting_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hebergement.hosting_api.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}