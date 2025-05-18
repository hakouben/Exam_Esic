package com.hebergement.hosting_api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import com.hebergement.hosting_api.model.Order;
import com.hebergement.hosting_api.model.User;
import com.hebergement.hosting_api.model.Voucher;
import com.hebergement.hosting_api.repository.OrderRepository;
import com.hebergement.hosting_api.repository.UserRepository;
import com.hebergement.hosting_api.repository.VoucherRepository;

@RestController
@RequestMapping("/admin")
// @PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final VoucherRepository voucherRepo;
    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public AdminController(
            VoucherRepository voucherRepo,
            OrderRepository orderRepo,
            UserRepository userRepo) {
        this.voucherRepo = voucherRepo;
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    // ---- VOUCHERS ----
    @PostMapping("/voucher")
    public Voucher createVoucher(@RequestBody Voucher v) {
        return voucherRepo.save(v);
    }

    @GetMapping("/vouchers")
    public List<Voucher> allVouchers() {
        return voucherRepo.findAll();
    }

    // ---- ORDERS ----
    @GetMapping("/orders")
    public List<Order> allOrders() {
        return orderRepo.findAll();
    }

    // ---- LOGS ----
    @GetMapping("/logs")
    public List<String> logs() {
        return List.of("User root created order VPS1", "Voucher ABC123 used");
    }

    // ---- USERS ----

    // 1. Récupérer tous les utilisateurs
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // 2. Supprimer un utilisateur
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
    }

    @PutMapping("/users/{id}/role")
    public User promoteToAdmin(@PathVariable Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!user.getRole().equals("USER")) {
            throw new RuntimeException("Seuls les utilisateurs peuvent être promus en admin.");
        }

        user.setRole("ADMIN");
        return userRepo.save(user);
    }

    // DTO pour la mise à jour du rôle
    public static class UpdateUserRoleRequest {
        private Long userId;
        private String newRole;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getNewRole() {
            return newRole;
        }

        public void setNewRole(String newRole) {
            this.newRole = newRole;
        }
    }
}
