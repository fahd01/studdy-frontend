import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Reclamation } from "../models/reclamation.model";
import { ReclamationService } from "../services/Reclamation/reclamation.service";
import {BadWordResponse} from "../models/bad-word.response";
import { GoogleGenerativeAI } from '@google/generative-ai';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-reclamation',
    templateUrl: './user-reclamation.component.html',
    styleUrls: ['./user-reclamation.component.css']
})
export class UserReclamationComponent implements OnInit {

    reclamations: Reclamation[] = []; // List of user's reclamations
    newReclamation: Reclamation = {
        description: '',
        status: 'PENDING',
        user: { userId: 0 }, // Initialize with 0, will be updated with the logged-in user's ID
    };
    selectedReclamation: Reclamation | null = null; // Reclamation selected for update
    showEmojiPicker: boolean = false; // Nouvelle propriété pour contrôler l'affichage
    private genAI = new GoogleGenerativeAI('AIzaSyDy8ck9bmDHeY71p-Lg8TFYU5X2GM1wG18'); // ta clé de gemini

    isRecording = false; // Variable to track if recording is in progress
    private recognition: any; // Variable to hold the speech recognition instance
    constructor(private reclamationService: ReclamationService) {}
    @ViewChild('picker') emojiPicker: any;

    toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
    }

    addEmoji(event: any) {
        this.newReclamation.description += event.detail.unicode;
        this.showEmojiPicker = false; // Cache le picker après sélection
    }

    // Pour fermer le picker quand on clique ailleurs
    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
        if (!this.emojiPicker?.nativeElement.contains(event.target) &&
            !(event.target as Element).classList.contains('emoji-trigger')) {
            this.showEmojiPicker = false;
        }
    }

    ngOnInit(): void {
        this.loadReclamations();


    }


    // Fetch the logged-in user's ID from session storage
    getUserId(): number {
        const userId = sessionStorage.getItem('userId');
        console.log('User ID from session storage:', userId); // Debug statement
        if (!userId) {
            console.error('User ID not found in session storage');
            return 0;
        }
        return +userId; // Convert to number
    }

    // Fetch all reclamations for the logged-in user from backend
    loadReclamations(): void {
        const userId = this.getUserId();
        if (userId === 0) {
            console.error('User ID not found in session storage');
            return;
        }

        this.reclamationService.getReclamationsByUser(userId).subscribe(
            (data) => {
                console.log('User reclamations:', data); // Debugging
                this.reclamations = data;
            },
            (error) => {
                console.error('Error fetching reclamations:', error);
            }
        );
    }

    // Create a new reclamation
  /*  createReclamation(): void {
        const userId = this.getUserId();
        if (userId === 0) {
            console.error('User ID not found in session storage');
            return;
        }

        // Set the user ID in the newReclamation object
        this.newReclamation.user.userId = userId;

        // Debug the payload before sending
        console.log('Sending reclamation payload:', this.newReclamation);

        this.reclamationService.createReclamation(userId, this.newReclamation).subscribe(
            (response) => {
                console.log('Reclamation created successfully:', response);

                // Add the new reclamation to the list
                this.reclamations.push(response);

                // Reset the form
                this.newReclamation.description = '';
            },
            (error) => {
                console.error('Error creating reclamation:', error);
            }
        );
    }*/
    async createReclamation(): Promise<void> {
        const userId = this.getUserId();
        if (userId === 0) return;

        this.newReclamation.user.userId = userId;


        const textToCheck = this.newReclamation.description;

        const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Analyse le texte suivant et dis-moi si c'est vulgaire, offensant ou inapproprié. Réponds uniquement par "OK" ou "VULGAIRE".
        Texte: "${textToCheck}"`;

        try {
          const result = await model.generateContent(prompt);
          const response = await result.response.text();

          if (response.trim().toUpperCase().includes('VULGAIRE')) {
            Swal.fire({
              icon: 'warning',
              title: 'Texte inapproprié',
              text: 'Le texte de la réclamation contient des propos inappropriés.',
            });
            return;
          }

          this.reclamationService.createReclamation(userId, this.newReclamation).subscribe({
            next: (response: any) => {
                if (response.status === 'rejected') {
                    // Handle bad word detection
                    this.showContentWarning(response);
                } else {
                    // Success case
                    this.reclamations.push(response as Reclamation);
                    this.newReclamation.description = '';
                }
            },
            error: (error) => {
                this.showError(error.message || 'Failed to create reclamation');
            }
        });
          // Ici tu continues normalement : appeler ton service ou API pour sauvegarder la réclamation
          Swal.fire({
            icon: 'success',
            title: 'Réclamation envoyée',
            text: 'Merci pour votre retour.',
          });
          this.newReclamation.description = ''; // reset formulaire

        } catch (err) {
          console.error(err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l’analyse du texte.', 'error');
        }



    }
    updateReclamation(): void {
        if (!this.selectedReclamation) return;

        this.reclamationService.updateReclamation(this.selectedReclamation.recId!, this.selectedReclamation).subscribe({
            next: (response: any) => {
                if (response.status === 'rejected') {
                    // Handle bad word detection
                    this.showContentWarning(response);
                } else {
                    // Success case
                    const index = this.reclamations.findIndex(rec => rec.recId === this.selectedReclamation!.recId);
                    if (index !== -1) this.reclamations[index] = response as Reclamation;
                    this.selectedReclamation = null;
                    this.showSuccess('Reclamation updated successfully!');
                }
            },
            error: (error) => {
                this.showError(error.message || 'Failed to update reclamation');
            }
        });
    }

    private showContentWarning(warning: BadWordResponse): void {
        // Format a detailed warning message
        const message = `
    ${warning.message}

    Reason: ${warning.details}

    ${warning.suggestion}
  `;

        // Show in a dialog or styled alert
        alert(message); // Replace with a better UI component

        // You could also highlight the problematic text in the form
        console.log('Content rejected due to:', warning.details);
    }

    private showError(message: string): void {
        // Implement your error display
        console.error(message);
        alert(message); // Replace with better UI
    }

    private showSuccess(message: string): void {
        // Implement your success notification
        console.log(message);
        alert(message); // Replace with better UI
    }
    // Delete a reclamation
    deleteReclamation(id: number): void {
        this.reclamationService.deleteReclamation(id).subscribe(
            () => {
                this.loadReclamations(); // Refresh the list
            },
            (error) => {
                console.error('Error deleting reclamation:', error);
            }
        );
    }
    selectReclamationForUpdate(reclamation: Reclamation): void {
        console.log('select reclamation to update button clicked'); // Debugging

        this.selectedReclamation = { ...reclamation }; // Create a copy of the selected reclamation
    }
   /* updateReclamation(): void {
        console.log('Update button clicked'); // Debugging
        if (!this.selectedReclamation) {
            console.error('No reclamation selected for update');
            return;
        }

        console.log('Selected Reclamation:', this.selectedReclamation); // Debugging

        this.reclamationService.updateReclamation(this.selectedReclamation.recId!, this.selectedReclamation).subscribe(
            (response) => {
                console.log('Reclamation updated successfully:', response);

                // Update the reclamation in the list
                const index = this.reclamations.findIndex((rec) => rec.recId === this.selectedReclamation!.recId);
                if (index !== -1) {
                    this.reclamations[index] = response;
                }

                // Reset the selected reclamation
                this.selectedReclamation = null;
            },
            (error) => {
                console.error('Error updating reclamation:', error);
            }
        );
    }*/


        async GeminiRecord() {
            if (!('webkitSpeechRecognition' in window)) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Non supporté',
                    text: 'Votre navigateur ne supporte pas la reconnaissance vocale',
                    timer: 3000
                });
                return;
            }

            if (this.isRecording) {
                this.stopRecording();
                await Swal.fire({
                    icon: 'success',
                    title: 'Enregistrement arrêté',
                    timer: 2000,
                    showConfirmButton: false
                });
                return;
            }

            this.isRecording = true;
            this.newReclamation.description += '\n[Enregistrement en cours...]\n';

            this.recognition = new (window as any).webkitSpeechRecognition();
            this.recognition.lang = 'fr-FR';
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 1;
            this.recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                this.processVoiceInput(transcript);

            };

            this.recognition.onerror = async (event: any) => {
                console.error('Erreur de reconnaissance:', event.error);
                this.isRecording = false;
                this.newReclamation.description = this.newReclamation.description.replace('\n[Enregistrement en cours...]\n', '');
                await Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Problème lors de la reconnaissance vocale: ' + event.error,
                    timer: 3000
                });
            };

            this.recognition.start();
            await Swal.fire({
                icon: 'info',
                title: 'Enregistrement',
                text: 'Parlez maintenant...',
                timer: 2000,
                showConfirmButton: false
            });
        }
        private stopRecording() {
            if (this.recognition) {
                this.recognition.stop();
            }
            this.isRecording = false;
            this.newReclamation.description = this.newReclamation.description.replace('\n[Enregistrement en cours...]\n', '');
        }

        private async processVoiceInput(transcript: string) {
            try {
                const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const prompt = `Transforme ce texte parlé en texte écrit correctement en français.
                    Corrige les fautes de grammaire et de ponctuation.
                    Conserve le sens original.
                    Texte à corriger: "${transcript}"`;

                const result = await model.generateContent(prompt);
                const response = await result.response.text();

                this.newReclamation.description += response.trim();
            } catch (err) {
                console.error(err);
                // Si erreur avec Gemini, utilise le texte original
                this.newReclamation.description += transcript;
                await Swal.fire({
                    icon: 'warning',
                    title: 'Avertissement',
                    text: 'Le texte original a été utilisé (sans correction)',
                    timer: 2000
                });
            }
        }
}
