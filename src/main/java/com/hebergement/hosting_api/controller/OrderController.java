// // // package com.hebergement.hosting_api.controller;

// // // import java.util.List;

// // // import org.springframework.security.core.Authentication;
// // // import org.springframework.web.bind.annotation.GetMapping;
// // // import org.springframework.web.bind.annotation.PostMapping;
// // // import org.springframework.web.bind.annotation.RequestBody;
// // // import org.springframework.web.bind.annotation.RequestMapping;
// // // import org.springframework.web.bind.annotation.RestController;

// // // import com.hebergement.hosting_api.model.Order;
// // // import com.hebergement.hosting_api.repository.OrderRepository;

// // // @RestController
// // // @RequestMapping("/order")
// // // public class OrderController {

// // //     private final OrderRepository repo;

// // //     public OrderController(OrderRepository repo) {
// // //         this.repo = repo;
// // //     }

// // //     @PostMapping
// // //     public Order placeOrder(@RequestBody Order order) {
// // //         // Ici, ajouter la logique pour vérifier bon, créer l’IP, etc.
// // //         return repo.save(order);
// // //     }

// // //     @GetMapping("/my")
// // //     public List<Order> myOrders(Authentication auth) {
// // //         // Exemple : rechercher via le nom d’utilisateur
// // //         return repo.findByUserId(1L); // À remplacer par l’ID réel extrait du token
// // //     }
// // // }

// // package com.hebergement.hosting_api.controller;

// // import java.util.List;

// // import org.slf4j.Logger;
// // import org.slf4j.LoggerFactory;
// // import org.springframework.security.core.Authentication;
// // import org.springframework.web.bind.annotation.*;

// // import com.hebergement.hosting_api.model.Order;
// // import com.hebergement.hosting_api.model.User;
// // import com.hebergement.hosting_api.repository.OrderRepository;
// // import com.hebergement.hosting_api.repository.UserRepository;

// // @RestController
// // @RequestMapping("/order")
// // public class OrderController {

// //     private final OrderRepository orderRepo;
// //     private final UserRepository userRepo;
// //     private static final Logger log = LoggerFactory.getLogger(OrderController.class);

// //     public OrderController(OrderRepository orderRepo, UserRepository userRepo) {
// //         this.orderRepo = orderRepo;
// //         this.userRepo = userRepo;
// //     }

// //     @PostMapping
// //     public Order placeOrder(@RequestBody Order order, Authentication auth) {
// //         log.info("Tentative de création d'une commande par l'utilisateur : {}", auth.getName());
// //         log.info("Détails de la commande reçue : {}", order);

// //         System.out.println("FakeJwtAuthFilter: Authorization header = ");


// //         try {
// //             // Associer l'utilisateur connecté
// //             User user = userRepo.findByUsername(auth.getName()).orElseThrow(() ->
// //                 new RuntimeException("Utilisateur non trouvé : " + auth.getName()));
// //             order.setUser(user);

// //             Order saved = orderRepo.save(order);
// //             log.info("Commande enregistrée avec ID : {}", saved.getId());
// //             return saved;
// //         } catch (Exception e) {
// //             log.error("Erreur lors de la création de la commande", e);
// //             throw e;
// //         }
// //     }

// //     @GetMapping("/my")
// //     public List<Order> myOrders(Authentication auth) {
// //         log.info("Récupération des commandes pour : {}", auth.getName());

// //         return userRepo.findByUsername(auth.getName())
// //                 .map(user -> orderRepo.findByUserId(user.getId()))
// //                 .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé : " + auth.getName()));
// //     }
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
//         System.out.println("enter here");
//         log.info("Création d'une commande sans authentification");
//         log.info("Détails de la commande reçue : {}", order);

//         Order saved = orderRepo.save(order);
//         log.info("Commande enregistrée avec ID : {}", saved.getId());
//         return saved;
//     }

//     @GetMapping("/my")
//     public List<Order> myOrders() {
//         log.info("Récupération de toutes les commandes (pas filtrées par utilisateur)");
//         return orderRepo.findAll();
//     }
// }

// @GetMapping("/ping")
// public String ping() {
//     return "pong";
// }

package com.hebergement.hosting_api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import com.hebergement.hosting_api.model.Order;
import com.hebergement.hosting_api.repository.OrderRepository;
@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderRepository orderRepo;
    private static final Logger log = LoggerFactory.getLogger(OrderController.class);

    public OrderController(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        System.out.println("enter here");
        log.info("Création d'une commande sans authentification");
        log.info("Détails de la commande reçue : {}", order);

        Order saved = orderRepo.save(order);
        log.info("Commande enregistrée avec ID : {}", saved.getId());
        return saved;
    }

    @GetMapping("/my")
    public List<Order> myOrders() {
        log.info("Récupération de toutes les commandes (pas filtrées par utilisateur)");
        return orderRepo.findAll();
    }

    // ✅ Méthode ping correctement placée ici
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
