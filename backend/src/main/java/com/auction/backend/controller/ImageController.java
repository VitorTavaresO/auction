package com.auction.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.auction.backend.model.Auction;
import com.auction.backend.model.Image;
import com.auction.backend.repository.AuctionRepository;
import com.auction.backend.services.AuctionService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/images")
public class ImageController {

    private static String UPLOAD_DIR = "backend/uploads/";

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private AuctionRepository auctionRepository;

    @PostMapping("/upload")
    public void uploadImages(@RequestParam("auctionId") Long auctionId, @RequestParam("images") List<MultipartFile> images) {
        Auction auction = auctionRepository.findById(auctionId).orElseThrow();
        List<Image> imageList = new ArrayList<>();
        for (MultipartFile file : images) {
            try {
                byte[] bytes = file.getBytes();
                Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
                Files.write(path, bytes);

                Image image = new Image();
                image.setAuction(auction);
                image.setPath(file.getOriginalFilename());
                imageList.add(image);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        auctionService.saveImages(auctionId, imageList);
    }
}