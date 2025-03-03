package com.esprit.study.entities;


import jakarta.persistence.*;
import java.util.Date;


@Entity
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;


    private String candidateName;
    private String email;
    private String cv; // This could be a file path or a reference to a file storage system

    @Temporal(TemporalType.DATE)
    private Date applicationDate;

    @ManyToOne
    @JoinColumn(name = "stage_id", nullable = false)
    private Stage stage;

    public void setId(int id) {
        this.id = id;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }

    public void setApplicationDate(Date applicationDate) {
        this.applicationDate = applicationDate;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public int getId() {
        return id;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public String getEmail() {
        return email;
    }

    public String getCv() {
        return cv;
    }

    public Date getApplicationDate() {
        return applicationDate;
    }

    public Stage getStage() {
        return stage;
    }
}
