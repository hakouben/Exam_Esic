// package com.hebergement.hosting_api.model;

// import java.time.LocalDate;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.Id;
// import jakarta.persistence.ManyToOne;

// @Entity
// public class Order {
//     @Id
//     @GeneratedValue
//     private Long id;

//     @ManyToOne
//     private User user;

//     @ManyToOne
//     private ServiceOffer service;

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public User getUser() {
//         return user;
//     }

//     public void setUser(User user) {
//         this.user = user;
//     }

//     public ServiceOffer getService() {
//         return service;
//     }

//     public void setService(ServiceOffer service) {
//         this.service = service;
//     }

//     public String getOs() {
//         return os;
//     }

//     public void setOs(String os) {
//         this.os = os;
//     }

//     public String getMachineName() {
//         return machineName;
//     }

//     public void setMachineName(String machineName) {
//         this.machineName = machineName;
//     }

//     public String getIp() {
//         return ip;
//     }

//     public void setIp(String ip) {
//         this.ip = ip;
//     }

//     public boolean isActive() {
//         return active;
//     }

//     public void setActive(boolean active) {
//         this.active = active;
//     }

//     public LocalDate getDate() {
//         return date;
//     }

//     public void setDate(LocalDate date) {
//         this.date = date;
//     }

//     public Voucher getVoucher() {
//         return voucher;
//     }

//     public void setVoucher(Voucher voucher) {
//         this.voucher = voucher;
//     }

//     private String os;
//     private String machineName;
//     private String ip;
//     private boolean active;
//     private LocalDate date;

//     @ManyToOne
//     private Voucher voucher;

//     // Getters, setters

// }


package com.hebergement.hosting_api.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders") // ✅ Nom de table corrigé pour éviter les conflits avec le mot réservé SQL "order"
public class Order {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private ServiceOffer service;

    private String os;
    private String machineName;
    private String ip;
    private boolean active;
    private LocalDate date;

    @ManyToOne
    private Voucher voucher;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ServiceOffer getService() {
        return service;
    }

    public void setService(ServiceOffer service) {
        this.service = service;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getMachineName() {
        return machineName;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Voucher getVoucher() {
        return voucher;
    }

    public void setVoucher(Voucher voucher) {
        this.voucher = voucher;
    }
}
