package com.esprit.study.repo;

import com.esprit.study.entities.Candidature;
import com.esprit.study.entities.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface CandidatureRepo extends JpaRepository<Candidature, Integer> {

    List<Candidature> findByStageId(int stageId);

    @Query("SELECT c.stage, COUNT(c) FROM Candidature c GROUP BY c.stage")
    List<Object[]> countCandidaturesByStage();


    @Query("SELECT s FROM Stage s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Stage> searchByTitle(@Param("title") String title);
}
