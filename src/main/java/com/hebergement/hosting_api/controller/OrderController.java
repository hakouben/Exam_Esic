// // // // package com.hebergement.hosting_api.controller;

// // // // import java.util.List;

// // // // import org.springframework.security.core.Authentication;
// // // // import org.springframework.web.bind.annotation.GetMapping;
// // // // import org.springframework.web.bind.annotation.PostMapping;
// // // // import org.springframework.web.bind.annotation.RequestBody;
// // // // import org.springframework.web.bind.annotation.RequestMapping;
// // // // import org.springframework.web.bind.annotation.RestController;

// // // // import com.hebergement.hosting_api.model.Order;
// // // // import com.hebergement.hosting_api.repository.OrderRepository;

// // // // @RestController
// // // // @RequestMapping("/order")
// // // // public class OrderController {

// // // //     private final OrderRepository repo;

// // // //     public OrderController(OrderRepository repo) {
// // // //         this.repo = repo;
// // // //     }

// // // //     @PostMapping
// // // //     public Order placeOrder(@RequestBody Order order) {
// // // //         // Ici, ajouter la logique pour vérifier bon, créer l’IP, etc.
// // // //         return repo.save(order);
// // // //     }

// // // //     @GetMapping("/my")
// // // //     public List<Order> myOrders(Authentication auth) {
// // // //         // Exemple : rechercher via le nom d’utilisateur
// // // //         return repo.findByUserId(1L); // À remplacer par l’ID réel extrait du token
// // // //     }
// // // // }

// // // package com.hebergement.hosting_api.controller;

// // // import java.util.List;

// // // import org.slf4j.Logger;
// // // import org.slf4j.LoggerFactory;
// // // import org.springframework.security.core.Authentication;
// // // import org.springframework.web.bind.annotation.*;

// // // import com.hebergement.hosting_api.model.Order;
// // // import com.hebergement.hosting_api.model.User;
// // // import com.hebergement.hosting_api.repository.OrderRepository;
// // // import com.hebergement.hosting_api.repository.UserRepository;

// // // @RestController
// // // @RequestMapping("/order")
// // // public class OrderController {

// // //     private final OrderRepository orderRepo;
// // //     private final UserRepository userRepo;
// // //     private static final Logger log = LoggerFactory.getLogger(OrderController.class);

// // //     public OrderController(OrderRepository orderRepo, UserRepository userRepo) {
// // //         this.orderRepo = orderRepo;
// // //         this.userRepo = userRepo;
// // //     }

// // //     @PostMapping
// // //     public Order placeOrder(@RequestBody Order order, Authentication auth) {
// // //         log.info("Tentative de création d'une commande par l'utilisateur : {}", auth.getName());
// // //         log.info("Détails de la commande reçue : {}", order);

// // //         System.out.println("FakeJwtAuthFilter: Authorization header = ");


// // //         try {
// // //             // Associer l'utilisateur connecté
// // //             User user = userRepo.findByUsername(auth.getName()).orElseThrow(() ->
// // //                 new RuntimeException("Utilisateur non trouvé : " + auth.getName()));
// // //             order.setUser(user);

// // //             Order saved = orderRepo.save(order);
// // //             log.info("Commande enregistrée avec ID : {}", saved.getId());
// // //             return saved;
// // //         } catch (Exception e) {
// // //             log.error("Erreur lors de la création de la commande", e);
// // //             throw e;
// // //         }
// // //     }

// // //     @GetMapping("/my")
// // //     public List<Order> myOrders(Authentication auth) {
// // //         log.info("Récupération des commandes pour : {}", auth.getName());

// // //         return userRepo.findByUsername(auth.getName())
// // //                 .map(user -> orderRepo.findByUserId(user.getId()))
// // //                 .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé : " + auth.getName()));
// // //     }
// // // }

// // package com.hebergement.hosting_api.controller;

// // import java.util.List;

// // import org.slf4j.Logger;
// // import org.slf4j.LoggerFactory;
// // import org.springframework.web.bind.annotation.*;

// // import com.hebergement.hosting_api.model.Order;
// // import com.hebergement.hosting_api.repository.OrderRepository;

// // @RestController
// // @RequestMapping("/order")
// // public class OrderController {

// //     private final OrderRepository orderRepo;
// //     private static final Logger log = LoggerFactory.getLogger(OrderController.class);

// //     public OrderController(OrderRepository orderRepo) {
// //         this.orderRepo = orderRepo;
// //     }

// //     @PostMapping
// //     public Order placeOrder(@RequestBody Order order) {
// //         System.out.println("enter here");
// //         log.info("Création d'une commande sans authentification");
// //         log.info("Détails de la commande reçue : {}", order);

// //         Order saved = orderRepo.save(order);
// //         log.info("Commande enregistrée avec ID : {}", saved.getId());
// //         return saved;
// //     }

// //     @GetMapping("/my")
// //     public List<Order> myOrders() {
// //         log.info("Récupération de toutes les commandes (pas filtrées par utilisateur)");
// //         return orderRepo.findAll();
// //     }
// // }

// // @GetMapping("/ping")
// // public String ping() {
// //     return "pong";
// // }

// package com.hebergement.hosting_api.controller;

// import java.util.List;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.web.bind.annotation.*;

// import com.hebergement.hosting_api.model.Order;
// import com.hebergement.hosting_api.repository.OrderRepository;
// @RestController
// @RequestMapping("/order")
// public class OrderController {

//     private final OrderRepository orderRepo;
//     private static final Logger log = LoggerFactory.getLogger(OrderController.class);

//     public OrderController(OrderRepository orderRepo) {
//         this.orderRepo = orderRepo;
//     }

//     @PostMapping
//     public Order placeOrder(@RequestBody Order order) {
//         Order saved = orderRepo.save(order);
//         log.info("Commande enregistrée avec ID : {}", saved.getId());
//         return saved;
//     }

//     @GetMapping("/my")
//     public List<Order> myOrders() {
//         log.info("Récupération de toutes les commandes (pas filtrées par utilisateur)");
//         return orderRepo.findAll();
//     }

//     // ✅ Méthode ping correctement placée ici
//     @GetMapping("/ping")
//     public String ping() {
//         return "pong";
//     }
// }


package com.hebergement.hosting_api.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import com.hebergement.hosting_api.model.Order;
import com.hebergement.hosting_api.model.Voucher;
import com.hebergement.hosting_api.model.ServiceOffer;
import com.hebergement.hosting_api.repository.OrderRepository;
import com.hebergement.hosting_api.repository.VoucherRepository;
import com.hebergement.hosting_api.repository.ServiceOfferRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Optional;
import java.time.LocalDate;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderRepository orderRepo;
    private final VoucherRepository voucherRepo;
    private final ServiceOfferRepository serviceRepo;

    private static final Logger log = LoggerFactory.getLogger(OrderController.class);

    public OrderController(OrderRepository orderRepo, VoucherRepository voucherRepo , ServiceOfferRepository serviceRepo) {
        this.orderRepo = orderRepo;
        this.voucherRepo = voucherRepo;
        this.serviceRepo = serviceRepo;
    }

    // @PostMapping
    // public Order placeOrder(@RequestBody Order order) {
    //     log.info("Tentative de création d'une commande : {}", order);

    //     // S'il y a un voucher associé
    //     if (order.getVoucher() != null && order.getVoucher().getCode() != null) {
    //         String code = order.getVoucher().getCode();
    //         Optional<Voucher> voucherOpt = voucherRepo.findById(code);

    //         if (voucherOpt.isEmpty()) {
    //             throw new RuntimeException("Le code promo est invalide.");
    //         }

    //         Voucher voucher = voucherOpt.get();

    //         if (voucher.isUsed()) {
    //             throw new RuntimeException("Ce code promo a déjà été utilisé.");
    //         }

    //         if (voucher.getExpirationDate().isBefore(LocalDate.now())) {
    //             throw new RuntimeException("Ce code promo a expiré.");
    //         }

    //         ServiceOffer offerInOrder = order.getService();
    //         ServiceOffer offerInVoucher = voucher.getService();

    //         if (offerInOrder == null || offerInVoucher == null ||
    //             !offerInOrder.getId().equals(offerInVoucher.getId())) {
    //             throw new RuntimeException("Ce code promo ne correspond pas à l'offre choisie.");
    //         }

    //         // Associer le bon objet (issu de la base) à la commande
    //         order.setVoucher(voucher);

    //         // Marquer le code comme utilisé
    //         voucher.setUsed(true);
    //         voucherRepo.save(voucher);
    //     }

    //     Order saved = orderRepo.save(order);
    //     log.info("Commande enregistrée avec ID : {}", saved.getId());
    //     return saved;
    // }

//     @PostMapping
// public ResponseEntity<?> placeOrder(@RequestBody Order order) {
//     log.info("Tentative de création d'une commande : {}", order);

//     // Vérification du code promo
//     if (order.getVoucher() != null && order.getVoucher().getCode() != null) {
//         String code = order.getVoucher().getCode();
//         Optional<Voucher> voucherOpt = voucherRepo.findById(code);

//         if (voucherOpt.isEmpty()) {
//             return ResponseEntity
//                     .status(HttpStatus.BAD_REQUEST)
//                     .body("Le code promo est invalide.");
//         }

//         Voucher voucher = voucherOpt.get();

//         if (voucher.isUsed()) {
//             return ResponseEntity
//                     .status(HttpStatus.BAD_REQUEST)
//                     .body("Ce code promo a déjà été utilisé.");
//         }

//         if (voucher.getExpirationDate().isBefore(LocalDate.now())) {
//             return ResponseEntity
//                     .status(HttpStatus.BAD_REQUEST)
//                     .body("Ce code promo a expiré.");
//         }

//         ServiceOffer offerInOrder = order.getService();
//         ServiceOffer offerInVoucher = voucher.getService();

//         if (offerInOrder == null || offerInVoucher == null ||
//                 !offerInOrder.getId().equals(offerInVoucher.getId())) {
//             return ResponseEntity
//                     .status(HttpStatus.BAD_REQUEST)
//                     .body("Ce code promo ne correspond pas à l'offre choisie.");
//         }

//         // Valide : associer le bon voucher
//         order.setVoucher(voucher);
//         voucher.setUsed(true);
//         voucherRepo.save(voucher);
//     }

//     Order saved = orderRepo.save(order);
//     log.info("Commande enregistrée avec ID : {}", saved.getId());
//     return ResponseEntity.ok(saved);
// }

// @PostMapping
// public ResponseEntity<?> placeOrder(@RequestBody Order order) {
//     log.info("Tentative de création d'une commande : {}", order);

//     // Vérification du code promo
//     if (order.getVoucher() != null && order.getVoucher().getCode() != null) {
//         String code = order.getVoucher().getCode();
//         Optional<Voucher> voucherOpt = voucherRepo.findById(code);

//         if (voucherOpt.isEmpty()) {
//             return ResponseEntity
//                     .status(HttpStatus.BAD_REQUEST)
//                     .body("Le code promo est invalide.");
//         }

//         Voucher voucher = voucherOpt.get();

//         if (voucher.isUsed()) {
//             return ResponseEntity
//                     .status(HttpStatus.BAD_REQUEST)
//                     .body("Ce code promo a déjà été utilisé.");
//         }

//         if (voucher.getExpirationDate().isBefore(LocalDate.now())) {
//             return ResponseEntity
//                     .status(HttpStatus.BAD_REQUEST)
//                     .body("Ce code promo a expiré.");
//         }

//         if (voucher.getDiscount() < 100) {
//             return ResponseEntity
//                     .status(HttpStatus.BAD_REQUEST)
//                     .body("Le code promo ne peut pas offrir 100% de réduction.");
//         }

//         ServiceOffer offerInOrder = order.getService();
//         ServiceOffer offerInVoucher = voucher.getService();

//         if (offerInOrder == null || offerInVoucher == null ||
//                 !offerInOrder.getId().equals(offerInVoucher.getId())) {
//             return ResponseEntity
//                     .status(HttpStatus.BAD_REQUEST)
//                     .body("Ce code promo ne correspond pas à l'offre choisie.");
//         }

//         // Valide : associer le bon voucher
//         order.setVoucher(voucher);
//         voucher.setUsed(true);
//         voucherRepo.save(voucher);
//     }

//     Order saved = orderRepo.save(order);
//     log.info("Commande enregistrée avec ID : {}", saved.getId());
//     return ResponseEntity.ok(saved);
// }

@PostMapping
public ResponseEntity<?> placeOrder(@RequestBody Order order) {
    log.info("Tentative de création d'une commande : {}", order);

    // Vérification du code promo
    if (order.getVoucher() != null && order.getVoucher().getCode() != null) {
        String code = order.getVoucher().getCode();
        Optional<Voucher> voucherOpt = voucherRepo.findById(code);

        if (voucherOpt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Le code promo est invalide.");
        }

        Voucher voucher = voucherOpt.get();

        if (voucher.isUsed()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Ce code promo a déjà été utilisé.");
        }

        if (voucher.getExpirationDate().isBefore(LocalDate.now())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Ce code promo a expiré.");
        }

        if (voucher.getDiscount() < 100) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Le code promo ne peut pas offrir moins de 100%.");
        }

        ServiceOffer offerInOrder = order.getService();
        ServiceOffer offerInVoucher = voucher.getService();

        if (offerInOrder == null || offerInVoucher == null ||
                !offerInOrder.getId().equals(offerInVoucher.getId())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Ce code promo ne correspond pas à l'offre choisie.");
        }

        order.setVoucher(voucher);
        voucher.setUsed(true);
        voucherRepo.save(voucher);
    }

    Order saved = orderRepo.save(order);

    // Charger les relations pour s'assurer qu'elles soient bien renvoyées
    saved.setService(serviceRepo.findById(saved.getService().getId()).orElse(null));
    if (saved.getVoucher() != null) {
        saved.setVoucher(voucherRepo.findById(saved.getVoucher().getCode()).orElse(null));
    }

    log.info("Commande enregistrée avec ID : {}", saved.getId());
    return ResponseEntity.ok(saved);
}


    @GetMapping("/my")
    public List<Order> myOrders() {
        log.info("Récupération de toutes les commandes (pas filtrées par utilisateur)");
        return orderRepo.findAll();
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
