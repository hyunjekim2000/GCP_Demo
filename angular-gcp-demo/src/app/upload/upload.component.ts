import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { FirestoreService } from '../firestore.service';

@Component({
  standalone: true,
  selector: 'app-upload',
  template: `
    <div>
      <input type="file" (change)="onFileSelected($event)" />
      <button (click)="uploadFile()">Upload File</button>
    </div>
  `,
})
export class UploadComponent {
  selectedFile?: File;

  constructor(private storageService: StorageService, private firestoreService: FirestoreService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const filePath = `uploads/${this.selectedFile.name}`;
      this.storageService.uploadFile(filePath, this.selectedFile).then(() => {
        console.log('File uploaded successfully');
        this.firestoreService.addItem('files', { filePath }).then(() => {
          console.log('File metadata saved to Firestore');
        });
      });
    }
  }
}
