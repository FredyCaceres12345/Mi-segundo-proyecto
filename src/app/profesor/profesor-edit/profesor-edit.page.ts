import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profesor-edit',
  templateUrl: './profesor-edit.page.html',
  styleUrls: ['./profesor-edit.page.scss'],
})
export class ProfesorEditPage implements OnInit {

  registroForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    cedula: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
  });

  profesorId : string | null = null;
  profesor : any = {};

  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => { 
      console.log(params);
      this.profesorId = params.id;
      });
      if (this.profesorId) {
         this.obtenerProfesor(this.profesorId);
      } else {
      }
    }

    incluirProfesor = () => { 
      console.log('Aqui incluir en firebase');
      let profesorRef = collection(this.firestore, 'profesor');
      const formValue = {
        ...this.registroForm.value,
      };

    addDoc(profesorRef, formValue).then((doc) => {
      console.log('Registro hecho');
      this.router.navigate(['/profesor-list']);
    }).catch((error) => {
      console.error('Error al crear el Profesor:', error);
    });
  };

  editarProfesor = (id: string) => {
    console.log('Aqui editar en firebase');
    let document = doc(this.firestore, 'profesor', id);
    const formValue = {
      ...this.registroForm.value,
    };
    
    updateDoc(document, formValue).then((doc) => {
      console.log('Registro editado');
      this.router.navigate(['/profesor-list']);
    }).catch((error) => {
      console.error('Error al editar el Profesor:', error);
    });
  };

obtenerProfesor = (id: string) => { 
  console.log('Listar profesor');
  let documentRef = doc(this.firestore, 'profesor', id);

  getDoc(documentRef).then((doc) => {
  if (doc.exists()) {
    console.log('Detalle del profesor:', doc.data());
    this.profesor = doc.data();
    this.registroForm.setValue({
    id: this.profesorId || '',
    nombre: this.profesor['nombre'] || '',
    apellido: this.profesor['apellido'] || '',
    cedula: this.profesor['cedula'] || '',
    direccion: this.profesor['direccion'] || '',
    telefono: this.profesor['telefono'] || '',
    });
    } else {
       console.log('No se encontró el monitor con el ID proporcionado.');
    }
    }).catch((error) => {
     console.error('Error al consultar el profesor:', error);
    });
  };

  incluirOEditarProfesor() {
    if (this.profesorId) {
    this.editarProfesor(this.profesorId);
    } else {
    this.incluirProfesor();
    }
    }
      
}
