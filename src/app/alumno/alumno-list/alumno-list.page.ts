import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, limit, startAfter } from '@angular/fire/firestore';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.page.html',
  styleUrls: ['./alumno-list.page.scss'],
})
export class AlumnoListPage implements OnInit {
  listaAlumno = new Array();
  maxResults = 10
  ultimoAlumnoRecuperado : any = null;
  constructor(private readonly firestore: Firestore) { }

  ngOnInit() {

    this.listarAlumnos();

  }

  listarAlumnosOld = () => {
    console.log("listar alumnos");
    const alumnosRef = collection(this.firestore, 'alumno');
    collectionData(alumnosRef, {idField: 'id'}).subscribe((respuesta)=>{
      console.log("estos son los alumnos", respuesta);
      this.listaAlumno = respuesta;
    });
  };

  listarAlumnos = () => {
    console.log("listar alumnos");
    const alumnosRef = collection(this.firestore, 'alumno');
    let q:
    if( ! this.ultimoAlumnoRecuperado == null) {
      q = query(alumnosRef, limit(this.maxResults));
    } else {
      query(alumnosRef, limit(this.maxResults));
      startAfter(this.ultimoAlumnoRecuperado)
    }
  
    getDocs(q).then(re => {
      this.ultimoAlumnoRecuperado = this.listaAlumno[this.listarAlumnos.length -1];
      re.forEach(doc => {
        let alumno : any = doc.data();
        alumno.id = doc.id;
        this.listarAlumnos.push(alumno);
        console.log(this.listaAlumno);
      });
    });
  }
    onIonInfinite(ev: any) {
      this.listarAlumnos();
      setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete
      }, 500);
    
}
