package com.hebergement.hosting_api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hebergement.hosting_api.model.User;
import com.hebergement.hosting_api.repository.UserRepository;
import java.util.Map;
import java.util.HashMap;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
    Optional<User> existingOpt = userRepository.findByUsername(req.username);

    if (existingOpt.isPresent() && passwordEncoder.matches(req.password, existingOpt.get().getPassword())) {
        User user = existingOpt.get();

        // Crée un token fake ici (à remplacer par JWT plus tard)
        String token = "FakeJWTToken-" + user.getUsername();

        // Créer une réponse manuellement sans exposer le mot de passe
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("username", user.getUsername());
        userInfo.put("role", user.getRole());

        response.put("user", userInfo);

        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(userRepository.save(user));
    }

    public static class LoginRequest {
        public String username;
        public String password;
    }
}
