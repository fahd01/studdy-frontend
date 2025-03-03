package com.esprit.study.controller;


import com.esprit.study.Service.StageService;
import com.esprit.study.entities.Stage;
import com.esprit.study.repo.CandidatureRepo;
import com.esprit.study.repo.StageRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@RequestMapping("/stages")
public class StageController {


    @Autowired
    private StageService serv;

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private CandidatureRepo candidatureRepository;

    @GetMapping
    public List<Stage> getAllStages() {
        return serv.getAllStages();
    }

    @GetMapping("/{id}")
    public Stage getStageById(@PathVariable int id) {
        return serv.getStageById(id);
    }

    @PostMapping
    public Stage saveStage(@RequestBody Stage stage) {
        return serv.saveStage(stage);
    }

    @PutMapping("/{id}")
    public Stage updateStage(@PathVariable int id, @RequestBody Stage updatedStage) {
        return serv.editStage(updatedStage);
    }

    @DeleteMapping("/{id}")
    public void deleteStage(@PathVariable int id) {
        serv.deleteStage(id);
    }


    @GetMapping("/stats")
    public Map<String, Object> getStageStats() {
        // Total number of stages
        long totalStages = stageRepository.count();

        // Number of stages with candidatures
        long stagesWithCandidatures = stageRepository.countStagesWithCandidatures();

        return Map.of(
                "totalStages", totalStages,
                "stagesWithCandidatures", stagesWithCandidatures
        );
    }

    @GetMapping("/search")
    public List<Stage> searchStages(@RequestParam String title) {
        return serv.searchStagesByTitle(title);
    }

}
