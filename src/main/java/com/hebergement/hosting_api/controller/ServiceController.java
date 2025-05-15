// package com.hebergement.hosting_api.controller;

// import java.util.List;

// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.hebergement.hosting_api.model.ServiceOffer;
// import com.hebergement.hosting_api.model.User;
// import com.hebergement.hosting_api.model.VMInstance;
// import com.hebergement.hosting_api.repository.ServiceOfferRepository;
// import com.hebergement.hosting_api.repository.UserRepository;
// import com.hebergement.hosting_api.repository.VMInstanceRepository;

// @RestController
// @RequestMapping("/services")
// public class ServiceController {

//     private final ServiceOfferRepository offerRepo;
//     private final VMInstanceRepository vmRepo;
//     private final UserRepository userRepo;

//     public ServiceController(ServiceOfferRepository offerRepo, VMInstanceRepository vmRepo, UserRepository userRepo) {
//         this.offerRepo = offerRepo;
//         this.vmRepo = vmRepo;
//         this.userRepo = userRepo;
//     }

//     // Liste des offres disponibles (catalogue public)
//     @GetMapping
//     public List<ServiceOffer> getAll() {
//         return offerRepo.findAll();
//     }

//     // Services actifs de l'utilisateur connecté
//     @GetMapping("/my")
//     public List<VMInstance> myServices(@AuthenticationPrincipal UserDetails userDetails) {
//         User user = userRepo.findByUsername(userDetails.getUsername()).orElseThrow();
//         return vmRepo.findByUser(user);
//     }

//     // Renouveler un service (fictif)
//     @PostMapping("/renew/{id}")
//     public String renew(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
//         VMInstance vm = vmRepo.findById(id).orElseThrow();
//         if (!vm.getUser().getUsername().equals(userDetails.getUsername())) {
//             return "Unauthorized";
//         }
//         return "Service renouvelé (fictif) pour : " + vm.getIp();
//     }

//     // Changer le mot de passe (fictif)
//     @PostMapping("/change-password/{id}")
//     public String changePassword(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
//         VMInstance vm = vmRepo.findById(id).orElseThrow();
//         if (!vm.getUser().getUsername().equals(userDetails.getUsername())) {
//             return "Unauthorized";
//         }
//         vm.setAccessCredentials("NouveauMotDePasse#" + System.currentTimeMillis());
//         vmRepo.save(vm);
//         return "Mot de passe modifié (fictif)";
//     }

//     // Résilier un service (fictif)
//     @PostMapping("/cancel/{id}")
//     public String cancel(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
//         VMInstance vm = vmRepo.findById(id).orElseThrow();
//         if (!vm.getUser().getUsername().equals(userDetails.getUsername())) {
//             return "Unauthorized";
//         }
//         vm.setStatus("Résilié");
//         vmRepo.save(vm);
//         return "Service marqué comme résilié (fictif)";
//     }

//     // ADMIN — Ajouter une nouvelle offre
//     @PreAuthorize("hasRole('ADMIN')")
//     @PostMapping
//     public ServiceOffer createService(@RequestBody ServiceOffer offer) {
//         return offerRepo.save(offer);
//     }

//     // ADMIN — Modifier une offre
//     @PreAuthorize("hasRole('ADMIN')")
//     @PutMapping("/{id}")
//     public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody ServiceOffer updatedOffer) {
//         return offerRepo.findById(id)
//                 .map(existing -> {
//                     existing.setName(updatedOffer.getName());
//                     existing.setType(updatedOffer.getType());
//                     existing.setSpecs(updatedOffer.getSpecs());
//                     existing.setPrice(updatedOffer.getPrice());
//                     offerRepo.save(existing);
//                     return ResponseEntity.ok(existing);
//                 })
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     // ADMIN — Supprimer une offre
//     @PreAuthorize("hasRole('ADMIN')")
//     @DeleteMapping("/{id}")
//     public ResponseEntity<?> deleteService(@PathVariable Long id) {
//         return offerRepo.findById(id)
//                 .map(service -> {
//                     offerRepo.delete(service);
//                     return ResponseEntity.ok("Service supprimé");
//                 })
//                 .orElse(ResponseEntity.notFound().build());
//     }
// }


package com.hebergement.hosting_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.hebergement.hosting_api.model.ServiceOffer;
import com.hebergement.hosting_api.model.User;
import com.hebergement.hosting_api.model.VMInstance;
import com.hebergement.hosting_api.repository.ServiceOfferRepository;
import com.hebergement.hosting_api.repository.UserRepository;
import com.hebergement.hosting_api.repository.VMInstanceRepository;
import com.hebergement.hosting_api.repository.OrderRepository;
import org.springframework.http.HttpStatus;
import java.util.Optional;


@RestController
@RequestMapping("/services")
public class ServiceController {

    private final ServiceOfferRepository offerRepo;
    private final VMInstanceRepository vmRepo;
    private final UserRepository userRepo;
    private final OrderRepository orderRepo;


    public ServiceController(ServiceOfferRepository offerRepo, VMInstanceRepository vmRepo, UserRepository userRepo ,  OrderRepository orderRepo) {
        this.offerRepo = offerRepo;
        this.vmRepo = vmRepo;
        this.userRepo = userRepo;
        this.orderRepo = orderRepo;
    }

    // ✅ Liste des offres disponibles (catalogue public)
    @GetMapping
    public List<ServiceOffer> getAll() {
        return offerRepo.findAll();
    }

    // ✅ Services actifs de l'utilisateur connecté
    @GetMapping("/my")
    public List<VMInstance> myServices(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByUsername(userDetails.getUsername()).orElseThrow();
        return vmRepo.findByUser(user);
    }

    // ✅ Renouveler un service (fictif)
    @PostMapping("/renew/{id}")
    public String renew(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        VMInstance vm = vmRepo.findById(id).orElseThrow();
        if (!vm.getUser().getUsername().equals(userDetails.getUsername())) {
            return "Unauthorized";
        }
        return "Service renouvelé (fictif) pour : " + vm.getIp();
    }

    // ✅ Changer le mot de passe (fictif)
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

    // ✅ Résilier un service (fictif)
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

    // ✅ ADMIN — Ajouter une nouvelle offre
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ServiceOffer createService(@RequestBody ServiceOffer offer) {
        return offerRepo.save(offer);
    }

    // ✅ ADMIN — Modifier une offre (mise à jour complète)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody ServiceOffer updatedOffer) {
        return offerRepo.findById(id)
                .map(existing -> {
                    existing.setName(updatedOffer.getName());
                    existing.setType(updatedOffer.getType());
                    existing.setPrice(updatedOffer.getPrice());

                    existing.setCpuCores(updatedOffer.getCpuCores());
                    existing.setRamGb(updatedOffer.getRamGb());
                    existing.setSsdStorageGb(updatedOffer.getSsdStorageGb());

                    existing.setWebsiteCount(updatedOffer.getWebsiteCount());
                    existing.setEmailAccounts(updatedOffer.getEmailAccounts());
                    existing.setSslIncluded(updatedOffer.isSslIncluded());
                    existing.setBandwidthUnlimited(updatedOffer.isBandwidthUnlimited());
                    existing.setSupportLevel(updatedOffer.getSupportLevel());
                    existing.setDomainIncluded(updatedOffer.isDomainIncluded());
                    existing.setCdnIncluded(updatedOffer.isCdnIncluded());

                    offerRepo.save(existing);
                    return ResponseEntity.ok(existing);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // // ✅ ADMIN — Supprimer une offre
    // @PreAuthorize("hasRole('ADMIN')")
    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deleteService(@PathVariable Long id) {
    //     return offerRepo.findById(id)
    //             .map(service -> {
    //                 offerRepo.delete(service);
    //                 return ResponseEntity.ok("Service supprimé");
    //             })
    //             .orElse(ResponseEntity.notFound().build());
    // }
    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteService(@PathVariable Long id) {
    Optional<ServiceOffer> offerOpt = offerRepo.findById(id);
    
    if (offerOpt.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    ServiceOffer offer = offerOpt.get();

    if (!orderRepo.findByService(offer).isEmpty()) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("This service offer is currently in use and cannot be deleted.");
    }

    offerRepo.delete(offer);
    return ResponseEntity.ok("Service offer deleted successfully.");
}


// ✅ Récupérer une offre de service par son ID
@GetMapping("/{id}")
public ResponseEntity<?> getServiceById(@PathVariable Long id) {
    return offerRepo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}


}
