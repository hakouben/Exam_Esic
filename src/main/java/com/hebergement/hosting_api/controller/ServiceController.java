package com.hebergement.hosting_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hebergement.hosting_api.model.ServiceOffer;
import com.hebergement.hosting_api.repository.ServiceOfferRepository;

@RestController
@RequestMapping("/services")
public class ServiceController {

    private final ServiceOfferRepository repo;

    public ServiceController(ServiceOfferRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<ServiceOffer> getAll() {
        return repo.findAll();
    }
}