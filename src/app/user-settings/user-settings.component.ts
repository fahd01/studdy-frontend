import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Role } from 'src/app/Model/enum/Role.enum';
import { UserService } from "../services/UserServ/user.service";
import { User } from "../Model/User/user";
(pdfMake as any).vfs = (pdfFonts as any).vfs;
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  user: User;
  userId: number = parseInt(sessionStorage.getItem('userId') || '0', 10);
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  uploadMessage: string = '';
  profilePictureUrl: string | ArrayBuffer | null = '';
  confirmDeactivation: boolean = false; // This will be bound to the checkbox
  passwordVisible = false;
//variable pour savoir si les données d'utilisateur sont completes ou non 
userDataComplete: boolean = false;
  constructor(
      private userService: UserService,
      private router: Router,
  ) {
    // Initialize user with default values
    this.user = new User(
        this.userId, '', '', '', '', new Date(), false, 0, Role.ADMIN, '', ''
    );
  }

  ngOnInit(): void {
    this.getUser();
    this.loadProfilePicture();
  }

  // Fetch user details
  getUser(): void {
    this.userService.getUser(this.userId).subscribe(
        (data) => {
          this.user = data;
          // Check if user data is complete
          // Assuming birthDate and phoneNumber are the fields to check
          this.userDataComplete = !!this.user.birthDate && !!this.user.phoneNumber;
          console.log('User data complete:', this.userDataComplete);
        },
        (error) => {
          console.error('Error fetching user', error);
        }
    );
  }

// Update user details
updateUser(): void {
  this.userService.updateUser(this.userId, this.user).subscribe(
      (data) => {
        console.log('User updated successfully', data);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        //refresh apres 2.5 s 
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      },
      (error) => {
        console.error('Error updating user', error);
        alert('Failed to update profile. Please try again.');
      }
  );
}


  // Deactivate user account
  deactivateAccount(): void {
    if (!this.confirmDeactivation) {
      alert('Please confirm account deactivation.');
      return; // Stop if checkbox is not checked
    }

    this.userService.deleteUserById(this.userId).subscribe(
        (response) => {
          console.log('Account deactivated successfully');
          alert('Account deactivated successfully.');
          this.router.navigate(['/register']); // Redirect to the register page
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
        },
        (error) => {
          console.error('Error deactivating account', error);
          alert('Failed to deactivate account. Please try again.');
        }
    );
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // Handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profilePictureUrl = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle file upload
  onUpload(): void {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file first.';
      return;
    }

    this.userService.uploadProfilePicture(this.userId, this.selectedFile).subscribe(
        (event) => {
          if (event.status === 'progress') {
            this.uploadProgress = event.message; // Update progress
          } else if (event.status === 'complete') {
            this.uploadMessage = 'Upload successful!';
            this.loadProfilePicture(); // Refresh profile picture after upload
          }
        },
        (error) => {
          this.uploadMessage = 'Error uploading picture.';
          console.error('Upload error:', error);
        }
    );
  }

  // Load profile picture
  loadProfilePicture(): void {
    this.userService.getProfilePicture(this.userId).subscribe(
        (blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.profilePictureUrl = reader.result;
          };
          reader.readAsDataURL(blob);
        },
        (error) => {
          console.error('Error loading profile picture', error);
          this.profilePictureUrl = 'assets/default-avatar.png'; // Fallback to default avatar
        }
    );
  }


  generatePdf() {
    // Date d'envoi du PDF
    const dateEnvoi = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  const docDefinition = {
    content: [
      {
        text: `Date of sending data: ${dateEnvoi}`,
        style: 'date'
      },

      `Mister/Madame ${this.user.username}, which your email corresponds to:  ${this.user.email}`,
      {
        text: 'Here are your personnal informations:',
        style: 'header'
      },
      {
        ul: [
          `Your mobile phone is ${this.user.phoneNumber}`,
          `Your birth date is ${this.user.birthDate}`,
        ],
        style: 'content'
      }
    ],
    styles: {

      header: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 10] as [number, number, number, number]
      },
      content: {
        fontSize: 14,
        margin: [0, 5, 0, 5] as [number, number, number, number]
      },
      signature: {
        margin: [0, 20, 0, 0] as [number, number, number, number]
      },
    }
  };

  const pdf = pdfMake.createPdf(docDefinition);

  // Téléchargement du PDF (vous pouvez supprimer cette ligne si vous ne voulez pas le télécharger)
  pdf.download('Informations.pdf');
  

  
}
}