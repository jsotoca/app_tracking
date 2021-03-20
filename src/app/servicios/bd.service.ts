import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(
    private afs: AngularFirestore
  ) { }

  testainiciarruta(codigo: string){
    this.afs.collection('testing')
    .doc(codigo)
    .set({
      coordenadas: []
    })
  }

  testagregarPosicion(codigo: string, coordenada: any){
    this.afs
    .collection('testing')
    .doc(codigo)
    .update({
      coordenadas: firebase.firestore.FieldValue.arrayUnion(coordenada)
    })
  }
}
