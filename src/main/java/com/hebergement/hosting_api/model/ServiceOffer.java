// package com.hebergement.hosting_api.model;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.Id;
// import jakarta.persistence.GenerationType;



// @Entity
// public class ServiceOffer {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY) // Ajouté
//     private Long id;
//     private String name;
//     private String type; // MUTUALISE, VPS_STD, VPS_PERF
//     private String specs; // "2 vCPU, 4Go RAM, 50Go SSD"
//     private double price;

//     // Getters, setters
//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public String getType() {
//         return type;
//     }

//     public void setType(String type) {
//         this.type = type;
//     }

//     public String getSpecs() {
//         return specs;
//     }

//     public void setSpecs(String specs) {
//         this.specs = specs;
//     }

//     public double getPrice() {
//         return price;
//     }

//     public void setPrice(double price) {
//         this.price = price;
//     }
// }

package com.hebergement.hosting_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ServiceOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type; // SHARED, BUSINESS, PREMIUM
    private double price; // Prix par mois

    private int cpuCores;
    private int ramGb;
    private int ssdStorageGb;

    private int websiteCount; // -1 pour "unlimited"
    private int emailAccounts; // -1 pour "unlimited"

    private boolean sslIncluded;
    private boolean bandwidthUnlimited;
    private String supportLevel; // BASIC, PRIORITY, PREMIUM
    private boolean domainIncluded;
    private boolean cdnIncluded;

    // Getters et Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getCpuCores() {
        return cpuCores;
    }

    public void setCpuCores(int cpuCores) {
        this.cpuCores = cpuCores;
    }

    public int getRamGb() {
        return ramGb;
    }

    public void setRamGb(int ramGb) {
        this.ramGb = ramGb;
    }

    public int getSsdStorageGb() {
        return ssdStorageGb;
    }

    public void setSsdStorageGb(int ssdStorageGb) {
        this.ssdStorageGb = ssdStorageGb;
    }

    public int getWebsiteCount() {
        return websiteCount;
    }

    public void setWebsiteCount(int websiteCount) {
        this.websiteCount = websiteCount;
    }

    public int getEmailAccounts() {
        return emailAccounts;
    }

    public void setEmailAccounts(int emailAccounts) {
        this.emailAccounts = emailAccounts;
    }

    public boolean isSslIncluded() {
        return sslIncluded;
    }

    public void setSslIncluded(boolean sslIncluded) {
        this.sslIncluded = sslIncluded;
    }

    public boolean isBandwidthUnlimited() {
        return bandwidthUnlimited;
    }

    public void setBandwidthUnlimited(boolean bandwidthUnlimited) {
        this.bandwidthUnlimited = bandwidthUnlimited;
    }

    public String getSupportLevel() {
        return supportLevel;
    }

    public void setSupportLevel(String supportLevel) {
        this.supportLevel = supportLevel;
    }

    public boolean isDomainIncluded() {
        return domainIncluded;
    }

    public void setDomainIncluded(boolean domainIncluded) {
        this.domainIncluded = domainIncluded;
    }

    public boolean isCdnIncluded() {
        return cdnIncluded;
    }

    public void setCdnIncluded(boolean cdnIncluded) {
        this.cdnIncluded = cdnIncluded;
    }
}
