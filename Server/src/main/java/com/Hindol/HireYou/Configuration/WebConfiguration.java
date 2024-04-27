package com.Hindol.HireYou.Configuration;

import com.Hindol.HireYou.Middleware.AuthenticationInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    @Bean
    public AuthenticationInterceptor authenticationInterceptor() {
        return new AuthenticationInterceptor();
    };

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authenticationInterceptor()).addPathPatterns("/api/v1/listing/**").excludePathPatterns("/api/v1/listing/details/{listingId}").excludePathPatterns("/");
        registry.addInterceptor(authenticationInterceptor()).addPathPatterns("/api/v1/application/**");
    }
}
