package com.hebergement.hosting_api.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hebergement.hosting_api.model.ServiceOffer;
import com.hebergement.hosting_api.model.User;
import com.hebergement.hosting_api.model.VMInstance;
import com.hebergement.hosting_api.repository.ServiceOfferRepository;
import com.hebergement.hosting_api.repository.UserRepository;
import com.hebergement.hosting_api.repository.VMInstanceRepository;

@RestController
@RequestMapping("/services")
public class ServiceController {

    private final ServiceOfferRepository offerRepo;
    private final VMInstanceRepository vmRepo;
    private final UserRepository userRepo;

    public ServiceController(ServiceOfferRepository offerRepo, VMInstanceRepository vmRepo, UserRepository userRepo) {
        this.offerRepo = offerRepo;
        this.vmRepo = vmRepo;
        this.userRepo = userRepo;
    }

    // 🔍 Liste des offres disponibles (catalogue public)
    @GetMapping
    public List<ServiceOffer> getAll() {
        return offerRepo.findAll();
    }

    // 👤 Services actifs de l'utilisateur connecté
    @GetMapping("/my")
    public List<VMInstance> myServices(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByUsername(userDetails.getUsername()).orElseThrow();
        return vmRepo.findByUser(user);
    }

    // 🔄 Renouveler un service (fictif)
    @PostMapping("/renew/{id}")
    public String renew(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        VMInstance vm = vmRepo.findById(id).orElseThrow();
        if (!vm.getUser().getUsername().equals(userDetails.getUsername())) {
            return "Unauthorized";
        }
        return "Service renouvelé (fictif) pour : " + vm.getIp();
    }

    // 🔐 Changer le mot de passe (fictif)
    @PostMapping("/change-password/{id}")
    public String changePassword(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        VMInstance vm = vmRepo.findById(id).orElseThrow();
        if (!vm.getUser().getUsername().equals(userDetails.getUsername())) {
            return "Unauthorized";
        }
        vm.setAccessCredentials("NouveauMotDePasse#" + System.currentTimeMillis());
        vmRepo.save(vm);
        return "Mot de passe modifié (fictif)";
    }

    // Résilier un service (fictif)
    @PostMapping("/cancel/{id}")
    public String cancel(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        VMInstance vm = vmRepo.findById(id).orElseThrow();
        if (!vm.getUser().getUsername().equals(userDetails.getUsername())) {
            return "Unauthorized";
        }
        vm.setStatus("Résilié");
        vmRepo.save(vm);
        return "Service marqué comme résilié (fictif)";
    }
}
