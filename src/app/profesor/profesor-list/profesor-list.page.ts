import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.page.html',
  styleUrls: ['./profesor-list.page.scss'],
})
export class ProfesorListPage implements OnInit {

  constructor(
    private readonly firestore: Firestore,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  profesorArray: any[] = [];

  ngOnInit() {
    this.listarProfesor();
  }

  listarProfesor = () => {
    console.log('Listar Profesores');
    const profesorRef = collection(this.firestore, 'profesor');
    collectionData(profesorRef, { idField: 'id' }).subscribe((respuesta) => {
      this.profesorArray = respuesta.map((profesor) => ({
        ...profesor,
      }));
      console.log('estos son los profesores', respuesta);
    });
  };

  eliminarProfesor = (id: string) => {
    console.log('Eliminando profesor con ID:', id);
    const documentRef = doc(this.firestore, 'profesor', id);
    deleteDoc(documentRef).then(() => {
      console.log('Profesor eliminado correctamente');
      this.router.navigate(['/profesor-list']);
    }).catch((error) => {
      console.log('Error al eliminar el monitor', error);
    });
  };
}
