package com.auction.backend.services;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.backend.model.Profile;
import com.auction.backend.repository.ProfileRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Profile create(Profile profile){
        return profileRepository.save(profile);
    }

    public Profile read(Long id){
        return profileRepository.findById(id).orElse(null);
    }

    public Profile update(Profile profile){
        Profile savedProfile = profileRepository.findById(profile.getId()).orElseThrow(() -> new NoSuchElementException("Profile not found"));
        savedProfile.setName(profile.getName());
        return profileRepository.save(savedProfile);
    }
}
