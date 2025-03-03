package com.esprit.study.Service;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
@Service
public class FileStorageService {

    private final Path rootLocation = Paths.get("uploads");

    public String storeFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("Failed to store empty file.");
        }

        // Create the uploads directory if it doesn't exist
        if (!Files.exists(rootLocation)) {
            Files.createDirectories(rootLocation);
        }

        // Generate a unique file name
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // Save the file to the uploads directory
        Path destinationFile = this.rootLocation.resolve(fileName);
        Files.copy(file.getInputStream(), destinationFile);

        return destinationFile.toString(); // Return the file path
    }
}
