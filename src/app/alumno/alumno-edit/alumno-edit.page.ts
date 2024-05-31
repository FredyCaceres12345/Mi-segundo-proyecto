import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumno-edit',
  templateUrl: './alumno-edit.page.html',
  styleUrls: ['./alumno-edit.page.scss'],
})
export class AlumnoEditPage implements OnInit {
  id: any;
  isNew : boolean = false;

  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {

    //this.incluirAlumno();
    //this.editarAlumno("v5bEDfhMwWutJZrxwX1M");
    this.route.params.subscribe((params: any) => {
      console.log('params', params);
      this.id = params.id;
      if (params.id == 'new'){
        this.isNew = true;
      } else {
      this.obtenerAlumno(this.id);
      }
    });

  }

  incluirAlumno = () => {
    console.log("Aqui incluir en firebase");
    let alumnosRef = collection(this.firestore, "alumno", this.id);
    addDoc(alumnosRef, {
      codigo: this.alumno.codigo,
      nombre: this.alumno.nombre,
      apellido: this.alumno.apellido,
    }).then(doc => {
      console.log("Registro Incluido");  
      this.router.navigate(['/alumno-list']);   
    }).catch(error => {
      //
    });
  };

  editarAlumno = () => {
    console.log("Aqui editar en firebase");
    const document = doc(this.firestore, "alumno", this.id);
    updateDoc(document, {
      codigo: this.alumno.codigo,
      nombre: this.alumno.nombre,
      apellido: this.alumno.apellido,
    }).then(doc => {
      console.log("Registro Editado"); 
      this.router.navigate(['/alumno-list']);  
    }).catch(error => {
      //informar al usuario
    });
  };

  guardarAlumno = () => {
    if (this.isNew) {
      this.incluirAlumno();
    } else {
      this.editarAlumno();
    }
  };

  alumno: any = {};
  obtenerAlumno = (id: string) => {
    console.log('Aqui editar en firebase');
    const document = doc(this.firestore, 'alumno', this.id);
    getDoc(document).then((doc) => {
      console.log('El documento es:' , doc.data());
      this.alumno = doc.data();
    }); 
  };

  eliminarAlumno = () => {
    console.log("Aqui editar en firebase");
    const document = doc(this.firestore, "alumno", this.id);
    deleteDoc(document).then(doc => {
      console.log("Registro Eliminado"); 
      this.router.navigate(['/alumno-list']);  
    }).catch(error => {
      //informar al usuario
    });
  };
}
