package com.hebergement.hosting_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hebergement.hosting_api.model.ServiceOffer;

public interface ServiceOfferRepository extends JpaRepository<ServiceOffer, Long> {
}