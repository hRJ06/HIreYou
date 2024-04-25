package com.Hindol.HireYou.Configuration;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class CloudinaryConfiguration {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dvpulu3cc");
        config.put("api_key", "516337169296598");
        config.put("api_secret", "t_faj3i3WIEmu3lG8eWsdJlPpik");
        config.put("secure", "true");
        return new Cloudinary(config);
    }
}
