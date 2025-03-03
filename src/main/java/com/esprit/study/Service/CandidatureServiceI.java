package com.esprit.study.Service;


import com.esprit.study.entities.Candidature;
import com.esprit.study.entities.Stage;
import com.esprit.study.repo.CandidatureRepo;
import com.esprit.study.repo.StageRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CandidatureServiceI {

    @Autowired
    private CandidatureRepo candidatureRepository;

    @Autowired
    private StageRepository stageRepository;


    public Candidature createCandidature(Candidature candidature) {
        // Ensure the associated stage exists
        Stage stage = stageRepository.findById(candidature.getStage().getId())
                .orElseThrow(() -> new RuntimeException("Stage not found with id: " + candidature.getStage().getId()));
        candidature.setStage(stage);
        return candidatureRepository.save(candidature);
    }


    public Candidature getCandidatureById(int id) {
        return candidatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidature not found with id: " + id));
    }


    public List<Candidature> getAllCandidatures() {
        return candidatureRepository.findAll();
    }


    public Candidature updateCandidature(int id, Candidature candidatureDetails) {
        Candidature candidature = getCandidatureById(id);
        candidature.setCandidateName(candidatureDetails.getCandidateName());
        candidature.setEmail(candidatureDetails.getEmail());
        candidature.setCv(candidatureDetails.getCv());
        candidature.setApplicationDate(candidatureDetails.getApplicationDate());

        // Update the stage if provided
        if (candidatureDetails.getStage() != null) {
            Stage stage = stageRepository.findById(candidatureDetails.getStage().getId())
                    .orElseThrow(() -> new RuntimeException("Stage not found with id: " + candidatureDetails.getStage().getId()));
            candidature.setStage(stage);
        }

        return candidatureRepository.save(candidature);
    }


    public void deleteCandidature(int id) {
        Candidature candidature = getCandidatureById(id);
        candidatureRepository.delete(candidature);
    }


    public List<Candidature> getCandidaturesByStageId(int stageId) {
        return candidatureRepository.findByStageId(stageId);
    }
}
