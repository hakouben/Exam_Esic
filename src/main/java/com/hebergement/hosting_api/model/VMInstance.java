package com.hebergement.hosting_api.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class VMInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ip;
    private String os;
    private String type; // "mutualisé" ou "vps"
    private String status; // "Actif", "Résilié", etc.
    private String accessCredentials; // identifiants SSH fictifs
    private LocalDate createdAt;

    @ManyToOne
    private User user;

    public VMInstance() {
        this.createdAt = LocalDate.now();
        this.status = "Actif";
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAccessCredentials() {
        return accessCredentials;
    }

    public void setAccessCredentials(String accessCredentials) {
        this.accessCredentials = accessCredentials;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
