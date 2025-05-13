package com.hebergement.hosting_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hebergement.hosting_api.model.Voucher;

public interface VoucherRepository extends JpaRepository<Voucher, String> {
}