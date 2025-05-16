package com.hebergement.hosting_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hebergement.hosting_api.repository.VoucherRepository;

@RestController
@RequestMapping("/voucher")
public class VoucherController {

    private final VoucherRepository repo;

    public VoucherController(VoucherRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/check/{code}")
    public ResponseEntity<?> check(@PathVariable String code) {
        return repo.findById(code)
                .map(v -> ResponseEntity.ok(v))
                .orElse(ResponseEntity.notFound().build());
    }
}