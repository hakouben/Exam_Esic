// package com.hebergement.hosting_api.controller;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.hebergement.hosting_api.repository.VoucherRepository;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import com.hebergement.hosting_api.model.Voucher;


// @RestController
// @RequestMapping("/voucher")
// public class VoucherController {

//     private final VoucherRepository repo;

//     public VoucherController(VoucherRepository repo) {
//         this.repo = repo;
//     }

//     @GetMapping("/check/{code}")
//     public ResponseEntity<?> check(@PathVariable String code) {
//         return repo.findById(code)
//                 .map(v -> ResponseEntity.ok(v))
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     // Modifier un voucher existant
//     @PutMapping("/{code}")
//     public ResponseEntity<?> update(@PathVariable String code, @RequestBody Voucher updated) {
//         return voucherRepo.findById(code)
//                 .map(existing -> {
//                     existing.setDiscount(updated.getDiscount());
//                     existing.setExpirationDate(updated.getExpirationDate());
//                     existing.setUsed(updated.isUsed());
//                     return ResponseEntity.ok(voucherRepo.save(existing));
//                 })
//                 .orElse(ResponseEntity.notFound().build());
//     }
// }

package com.hebergement.hosting_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hebergement.hosting_api.model.Voucher;
import com.hebergement.hosting_api.repository.VoucherRepository;

@RestController
@RequestMapping("/voucher")
public class VoucherController {

    private final VoucherRepository voucherRepo;

    public VoucherController(VoucherRepository voucherRepo) {
        this.voucherRepo = voucherRepo;
    }

    @GetMapping("/check/{code}")
    public ResponseEntity<?> check(@PathVariable String code) {
        return voucherRepo.findById(code)
                .map(v -> ResponseEntity.ok(v))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{code}")
    public ResponseEntity<?> update(@PathVariable String code, @RequestBody Voucher updated) {
        return voucherRepo.findById(code)
                .map(existing -> {
                    existing.setDiscount(updated.getDiscount());
                    existing.setExpirationDate(updated.getExpirationDate());
                    existing.setUsed(updated.isUsed());
                    existing.setService(updated.getService()); // si tu veux aussi changer le service
                    return ResponseEntity.ok(voucherRepo.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
