// package com.hebergement.hosting_api.model;

// import java.time.LocalDate;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;

// @Entity
// public class Voucher {
//     @Id
//     private String code;
//     private double discount;
//     private LocalDate expirationDate;
//     private boolean used;

//     // Getters, setters
//     public String getCode() {
//         return code;
//     }

//     public void setCode(String code) {
//         this.code = code;
//     }

//     public double getDiscount() {
//         return discount;
//     }

//     public void setDiscount(double discount) {
//         this.discount = discount;
//     }

//     public LocalDate getExpirationDate() {
//         return expirationDate;
//     }

//     public void setExpirationDate(LocalDate expirationDate) {
//         this.expirationDate = expirationDate;
//     }

//     public boolean isUsed() {
//         return used;
//     }

//     public void setUsed(boolean used) {
//         this.used = used;
//     }
// }

// package com.hebergement.hosting_api.model;

// import java.time.LocalDate;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;

// @Entity
// public class Voucher {
//     @Id
//     private String code;
//     private double discount;
//     private LocalDate expirationDate;
//     private boolean used;

//     // Getters, setters
//     public String getCode() {
//         return code;
//     }

//     public void setCode(String code) {
//         this.code = code;
//     }

//     public double getDiscount() {
//         return discount;
//     }

//     public void setDiscount(double discount) {
//         this.discount = discount;
//     }

//     public LocalDate getExpirationDate() {
//         return expirationDate;
//     }

//     public void setExpirationDate(LocalDate expirationDate) {
//         this.expirationDate = expirationDate;
//     }

//     public boolean isUsed() {
//         return used;
//     }

//     public void setUsed(boolean used) {
//         this.used = used;
//     }
// }

package com.hebergement.hosting_api.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Voucher {

    @Id
    private String code;

    private double discount;

    private LocalDate expirationDate;

    private boolean used;

    @ManyToOne(optional = false) // chaque voucher est lié à un service
    private ServiceOffer service;

    // Getters et Setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    public ServiceOffer getService() {
        return service;
    }

    public void setService(ServiceOffer service) {
        this.service = service;
    }
}
