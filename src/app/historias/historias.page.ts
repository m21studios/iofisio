import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historias',
  templateUrl: './historias.page.html',
  styleUrls: ['./historias.page.scss'],
})
export class HistoriasPage implements OnInit {

  constructor(public navegar : Router) { }

  ngOnInit() {
  }

  iradasboard(){
    //this.activar = false;
    this.navegar.navigate(['/dashboard']);
  }

  nuevaCita(){
    //this.activar = false;
    this.navegar.navigate(['/agenda']);
  }

  listadeHistorias(){
    //this.activar = false;
    this.navegar.navigate(['/historias']);
  }

  listadePacientes(){
    //this.activar = false;
    this.navegar.navigate(['/pacientes']);
  }
}
