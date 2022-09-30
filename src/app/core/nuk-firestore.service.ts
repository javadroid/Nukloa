
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,query, where
} from '@firebase/firestore';

import { Firestore, collectionData, docData, FirestoreModule } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface user{

    walletAddress: string;
    referredby:string;

  // this.store.create(user)
}


@Injectable({
  providedIn: 'root'
})
export class NukFirestoreService {
  private nukData: CollectionReference<DocumentData>;
  private dbPath = '/tutorials';

  
  constructor(private readonly firestore: Firestore,private db: FirestoreModule) {
    this.nukData = collection(this.firestore, 'user');
    
  }


  getAll() {
    return collectionData(this.nukData, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  get(id: string) {
    const nukDataDocumentReference = doc(this.firestore, `user/${id}`);
    return docData(nukDataDocumentReference, { idField: 'id' });
  }

  create(user: user) {
    return addDoc(this.nukData, user);
  }
  
  update(user: any) {
    const nukData = doc(
      this.firestore,
      `user/${user.id}`
    );
    return updateDoc(nukData, { ...user });
  }
  
  updates(key: string, value: any): Promise<void> {
    return updateDoc(doc(  this.firestore ,`user/${key}`)   , value);
  }

  delete(id: string) {
    const nukDataDocumentReference = doc(this.firestore, `user/${id}`);
    return deleteDoc(nukDataDocumentReference);
  }
;

e(id:string){
  const citiesRef = collection(this.firestore, "user");

  // Create a query against the collection.
  const q = query(citiesRef, where("walletAddress", "==", id));
  return collectionData(q, { idField: 'id' });
}

}

