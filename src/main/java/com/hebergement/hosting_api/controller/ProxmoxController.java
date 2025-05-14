package com.hebergement.hosting_api.controller;

import com.hebergement.hosting_api.service.ProxmoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/proxmox")
public class ProxmoxController {

    @Autowired
    private ProxmoxService proxmoxService;

    @PostMapping("/deploy")
    public ResponseEntity<String> deploy() {
        String result = proxmoxService.deploy();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<String> getStatus(@PathVariable("id") Long id) {
        String status = proxmoxService.getStatus(id);
        return ResponseEntity.ok(status);
    }
}