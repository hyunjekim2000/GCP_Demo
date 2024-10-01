import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getItems(collectionPath: string): Observable<any[]> {
    const colRef = collection(this.firestore, collectionPath);
    return collectionData(colRef, { idField: 'id' });
  }

  addItem(collectionPath: string, data: any) {
    const colRef = collection(this.firestore, collectionPath);
    return addDoc(colRef, data);
  }
}
