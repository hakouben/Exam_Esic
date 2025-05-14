package com.hebergement.hosting_api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ProxmoxService {

    @Value("${proxmox.api.url}")
    private String apiUrl;

    @Value("${proxmox.api.tokenId}")
    private String tokenId;

    @Value("${proxmox.api.tokenSecret}")
    private String tokenSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    public String deploy() {
        String url = apiUrl + "/nodes/proxmox-principal/qemu";
        HttpHeaders headers = new HttpHeaders();
        String authHeader = "PVEAPIToken=" + tokenId + "=" + tokenSecret;
        headers.set("Authorization", authHeader);
        headers.setContentType(MediaType.APPLICATION_JSON);
        String payload = "{\"vmid\": 100, \"name\": \"vm-test\", \"memory\": 2048}";
        HttpEntity<String> entity = new HttpEntity<>(payload, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
        return response.getBody();
    }

    public String getStatus(Long vmId) {
        String url = apiUrl + "/nodes/proxmox-principal/qemu/" + vmId + "/status/current";
        HttpHeaders headers = new HttpHeaders();
        String authHeader = "PVEAPIToken=" + tokenId + "=" + tokenSecret;
        headers.set("Authorization", authHeader);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }
}