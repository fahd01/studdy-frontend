package com.esprit.study.repo;

import com.esprit.study.entities.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StageRepository extends JpaRepository<Stage, Integer> {


}
