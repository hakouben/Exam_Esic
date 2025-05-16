package com.hebergement.hosting_api.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hebergement.hosting_api.model.Order;
import com.hebergement.hosting_api.repository.OrderRepository;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderRepository repo;

    public OrderController(OrderRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        // Ici, ajouter la logique pour vérifier bon, créer l’IP, etc.
        return repo.save(order);
    }

    @GetMapping("/my")
    public List<Order> myOrders(Authentication auth) {
        // Exemple : rechercher via le nom d’utilisateur
        return repo.findByUserId(1L); // À remplacer par l’ID réel extrait du token
    }
}