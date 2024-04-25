package com.Hindol.HireYou.Util;

import com.Hindol.HireYou.Entity.User;
import com.Hindol.HireYou.Payload.TokenValidationResultDTO;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JWTToken {
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private static final long EXPIRATION_TIME = 365 * 24 * 60 * 60 * 1000;
    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
        Claims claims = Jwts.claims().setSubject(user.getEmail());
        claims.put("Role",user.getRole());
        return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(expiryDate).signWith(secretKey).compact();
    }
    public TokenValidationResultDTO verifyToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
            String email = claims.getSubject();
            String role = (String) claims.get("Role");
            return new TokenValidationResultDTO(email,"Valid Token",role);
        }
        catch (ExpiredJwtException e) {
            return new TokenValidationResultDTO(null,"Expired Token",null);
        }
        catch (JwtException | IllegalArgumentException e) {
            return new TokenValidationResultDTO(null,"Invalid Token",null);
        }
    }
}
