import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Citas } from '../models/citas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  public numerodepacientes:any = 0;
  public numerodecitasparahoy: any = 0;

  public listadecitas:Citas[];
  public data: any;

  public bdNombre:any = 'appFisioterapia';
  public bdVersion:any = 1;
  
  dataIndexed:any;
  public fechadehoy:any = moment().format('L');
  public horaactual:any = moment().format('LT');
  public mostrarCitas: boolean;
  public nohayCitas:boolean;

  constructor(public navegar : Router) { }

  ngOnInit() {
    this.mostrarCitas = true;
    this.nohayCitas = false;

    this.cargarNumerodePacientes();
    this.cargarCitasParaHoy(this.fechadehoy);
    this.numerodecitasparahoy = 0;
    this.numerodepacientes = 0;

  }

  public cargarNumerodeCitas(){
    //this.numerodecitasparahoy = 0;
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    let db: any;
    let transaccion: any; 
    let citasAlmacenadas: any;
    let datos:any = [];

    request.onsuccess = function(event){
      let resultados:any;
      db = request.result;
      transaccion = db.transaction(['citas'],'readonly');
      citasAlmacenadas = transaccion.objectStore('citas');

      let totalpacientes = citasAlmacenadas.count();

      totalpacientes.onsuccess = function() {
        this.numerodecitasparahoy = totalpacientes.result;
        console.log('Total Citas>',this.numerodecitasparahoy);
        document.querySelector("#totalcitas").innerHTML = this.numerodecitasparahoy;
      }
      
    }
     

    request.onerror = function(event){
      console.log ('[onerror]', request.error); 
    }
  }

  public cargarNumerodePacientes(){
    //this.numerodepacientes = 0;
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    let db: any;
    let transaccion: any; 
    let pacientesAlmacenadas: any;
    let datos:any = [];

    request.onsuccess = function(event){
      let resultados:any;
      db = request.result;
      transaccion = db.transaction(['pacientes'],'readonly');
      pacientesAlmacenadas = transaccion.objectStore('pacientes');

      let totalpacientes = pacientesAlmacenadas.count();

      totalpacientes.onsuccess = function() {
        this.numerodepacientes = totalpacientes.result;
        //console.log('Total Pacientes>',this.numerodepacientes);
        document.querySelector("#totalpacientes").innerHTML = this.numerodepacientes;
      }
      
    }
     

    request.onerror = function(event){
      console.log ('[onerror]', request.error); 
    }
  }

  public cargarCitasParaHoy(data:string){
    //console.log('la fecha de hoy es: ',data)
    this.numerodecitasparahoy = '0';
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    let db: any;
    let transaccion: any; 
    let citasAlmacenadas: any;
    let datos:any = [];
    

    request.onsuccess = function(event){
      let resultados:any;
      db = request.result;
      transaccion = db.transaction(["citas"], "readonly");
      citasAlmacenadas = transaccion.objectStore("citas");
      
      var mostrarporfecha = citasAlmacenadas.index("fecha");
      var keyRng = IDBKeyRange.only(data);
      
      resultados = mostrarporfecha.openCursor(keyRng).onsuccess = function(event){
        var cursor = event.target.result;

        if (cursor) {
          //console.log(cursor.value);
          datos.push(cursor.value);
          cursor.continue();
        } else {
          var outerHTML = '';
  
          for (var key in datos){
            outerHTML += `<tr>
              <td>`+datos[key].identificacion+`</td>
              <td>`+datos[key].nombres+`</td>
              <td>`+datos[key].apellidos+`</td>
              <td>`+datos[key].fecha+`</td>
              <td>`+datos[key].hora+`</td>
            </tr>`;

            //console.log('total de citas: ',datos.length);
            

            if(datos.length == 0){
              this.nohayCitas = true;
              this.numerodecitasparahoy = 0;
            }else if(datos.length > 0){
              this.nohayCitas = false;
              this.numerodecitasparahoy = datos.length;
            }
          }

          //console.log('<<<< Numero de citas >>>> ',this.numerodecitasparahoy);
          
          datos = [];
          document.querySelector("#dataIndexed").innerHTML = outerHTML;

         
          
          console.log("¡No hay más registros disponibles!");
          
        }
      }    
    }
  
    request.onerror = function(event){
      console.log ('[onerror]', request.error); 
    }

    if(this.numerodecitasparahoy === 'undefined'){
      document.querySelector("#totalcitas").innerHTML = '0';
    }else{
      document.querySelector("#totalcitas").innerHTML = this.numerodecitasparahoy;
    }

  }

  //NAVEGACION
  iradasboard(){
    this.navegar.navigate(['/dashboard']);
  }

  nuevaCita(){
    this.navegar.navigate(['/agenda']);
  }

  listadeHistorias(){
    this.navegar.navigate(['/historias']);
  }

  listadePacientes(){
    this.navegar.navigate(['/pacientes']);
  }

}
