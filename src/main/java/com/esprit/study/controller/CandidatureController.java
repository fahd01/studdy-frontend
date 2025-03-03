package com.esprit.study.controller;

import com.esprit.study.Service.CandidatureServiceI;
import com.esprit.study.Service.EmailService;
import com.esprit.study.Service.FileStorageService;
import com.esprit.study.entities.Candidature;
import com.esprit.study.entities.Stage;
import com.esprit.study.repo.CandidatureRepo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    @Autowired
    private CandidatureServiceI candidatureService;

    @Autowired
    private CandidatureRepo candidatureRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private EmailService emailService;

    // Create a new Candidature
    @PostMapping
    public ResponseEntity<Candidature> createCandidature(@RequestBody Candidature candidature) {
        Candidature createdCandidature = candidatureService.createCandidature(candidature);


        // Send confirmation email
        try {
            String subject = "Candidature Confirmation";
            String body = "Dear " + candidature.getCandidateName() + ",\n\nYour candidature has been successfully submitted.\n\nBest regards,\n Study Team";
            emailService.sendEmail(candidature.getEmail(), subject, body);
        } catch (Exception e) {
            System.err.println("Failed to send confirmation email: " + e.getMessage());
        }
        return ResponseEntity.ok(createdCandidature);

    }
    @PostMapping(value = "/upload-cv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadCv(@RequestParam("cv") MultipartFile cvFile) throws IOException {
        // Use the FileStorageService to save the file and return the path
        return fileStorageService.storeFile(cvFile);
    }



    // Get a Candidature by ID
    @GetMapping("/{id}")
    public ResponseEntity<Candidature> getCandidatureById(@PathVariable int id) {
        Candidature candidature = candidatureService.getCandidatureById(id);
        return ResponseEntity.ok(candidature);
    }

    // Get all Candidatures
    @GetMapping
    public ResponseEntity<List<Candidature>> getAllCandidatures() {
        List<Candidature> candidatures = candidatureService.getAllCandidatures();
        return ResponseEntity.ok(candidatures);
    }

    // Update a Candidature
    @PutMapping("/{id}")
    public ResponseEntity<Candidature> updateCandidature(@PathVariable int id, @RequestBody Candidature candidatureDetails) {
        Candidature updatedCandidature = candidatureService.updateCandidature(id, candidatureDetails);
        return ResponseEntity.ok(updatedCandidature);
    }

    // Delete a Candidature
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidature(@PathVariable int id) {
        candidatureService.deleteCandidature(id);
        return ResponseEntity.noContent().build();
    }

    // Get Candidatures by Stage ID
    @GetMapping("/stage/{stageId}")
    public ResponseEntity<List<Candidature>> getCandidaturesByStageId(@PathVariable int stageId) {
        List<Candidature> candidatures = candidatureService.getCandidaturesByStageId(stageId);
        return ResponseEntity.ok(candidatures);
    }


    @GetMapping("/stats")
    public Map<String, Object> getCandidatureStats() {
        // Total number of candidatures
        long totalCandidatures = candidatureRepository.count();

        // Number of candidatures grouped by stage
        List<Object[]> candidaturesByStage = candidatureRepository.countCandidaturesByStage();
        Map<String, Long> candidaturesByStageMap = candidaturesByStage.stream()
                .collect(Collectors.toMap(
                        result -> ((Stage) result[0]).getTitle(), // Stage title
                        result -> (Long) result[1]               // Candidature count
                ));

        return Map.of(
                "totalCandidatures", totalCandidatures,
                "candidaturesByStage", candidaturesByStageMap
        );
    }
}
