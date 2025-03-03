package com.esprit.study.Service;


import com.esprit.study.entities.Stage;
import com.esprit.study.repo.StageRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StageService {


    @Autowired
    private StageRepository repo;

    public List<Stage> getAllStages() {
        return repo.findAll();
    }

    public Stage getStageById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Stage saveStage(Stage stage) {
        return repo.save(stage);
    }

    public Stage editStage(Stage stage) {
        return repo.save(stage);
    }

    public void deleteStage(int id) {
        repo.deleteById(id);
    }

    public List<Stage> searchStagesByTitle(String title) {
        return repo.searchByTitle(title);
    }
}