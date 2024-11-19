package com.auction.backend.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Table(name = "person")
@Data
@JsonIgnoreProperties({"authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled"})
public class Person implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "{name.required}")
    private String name;

    @NotBlank(message = "{cpf.required}")
    private String cpf;

    @NotBlank(message =  "{email.required}")
    @Email(message =  "{email.invalid}")
    private String email;

    @NotBlank(message = "{phone.required}")
    private String phone;

    @NotBlank(message =  "{password.required}")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String validationCode;
    private LocalDateTime validationCodeValidity;
    private String emailValidationCode;
    private boolean active;

    @Transient
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void setPassword(String password) {
        this.password = passwordEncoder.encode(password);
    }


    @OneToMany(mappedBy = "person", orphanRemoval = true, cascade = CascadeType.ALL)
    @Setter(value = AccessLevel.NONE)
    private List<PersonProfile> personProfile;

    public void setPersonProfile(List<PersonProfile> listPersonProfile) {
        for (PersonProfile profile : listPersonProfile) {
            profile.setPerson(this);
        }
        personProfile = listPersonProfile;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return personProfile.stream().map(userRole -> new SimpleGrantedAuthority(userRole.getProfile().getName())).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

}
