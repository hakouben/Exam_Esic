package com.hebergement.hosting_api;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // autorise tous les endpoints
                .allowedOrigins("http://localhost:8080") // frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // autorise toutes les méthodes
                .allowedHeaders("*")
                .allowCredentials(true); // si tu utilises des cookies ou auth
    }
}
