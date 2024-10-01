import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  uploadFile(filePath: string, file: File): Promise<any> {
    const storageRef = ref(this.storage, filePath);
    return uploadBytes(storageRef, file);
  }

  getFileUrl(filePath: string): Promise<string> {
    const storageRef = ref(this.storage, filePath);
    return getDownloadURL(storageRef);
  }
}
