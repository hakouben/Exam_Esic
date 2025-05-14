package com.hebergement.hosting_api.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hebergement.hosting_api.model.Order;
import com.hebergement.hosting_api.model.Voucher;
import com.hebergement.hosting_api.repository.OrderRepository;
import com.hebergement.hosting_api.repository.VoucherRepository;

@RestController
@RequestMapping("/admin")
// @PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final VoucherRepository voucherRepo;
    private final OrderRepository orderRepo;

    public AdminController(VoucherRepository voucherRepo, OrderRepository orderRepo) {
        this.voucherRepo = voucherRepo;
        this.orderRepo = orderRepo;
    }

    @PostMapping("/voucher")
    public Voucher createVoucher(@RequestBody Voucher v) {
        return voucherRepo.save(v);
    }

    @GetMapping("/vouchers")
    public List<Voucher> allVouchers() {
        return voucherRepo.findAll();
    }

    @GetMapping("/orders")
    public List<Order> allOrders() {
        return orderRepo.findAll();
    }

    @GetMapping("/logs")
    public List<String> logs() {
        return List.of("User root created order VPS1", "Voucher ABC123 used");
    }
}