import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import *  as moment from 'moment';
import { Pacientes } from '../models/pacientes';
import { Citas } from '../models/citas';
import { DblocalService } from '../services/dblocal.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})

export class AgendaPage implements OnInit {

  identificacionDelPaciente: string;
  public pacientes:Pacientes[];

  public datosDelPaciente:Citas = {
    identificacion: '',
    nombres: '',
    apellidos: '',
    fecha: '',
    hora:'',
    telefono: ''
  } 

  public extradata:any = {
    identificacion:'',
    nombre:'',
    apellidos:''
  }

  public bdNombre:any = 'appFisioterapia';
  public bdVersion:any = 1;

  pacienteencontrado:boolean = false;
  public fechadehoy:any = moment().format('L');
  public horaactual:any = moment().format('LT');

  constructor(
    public navegar : Router,
    public api: DblocalService
  ) { }

  ngOnInit() {
    this.datosDelPaciente.fecha = this.fechadehoy;
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

  //FUNCIONES
  public consultarPaciente(){
    let data = this.identificacionDelPaciente;
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    console.log('la identificacion del pacientes: ',data);
    let  auxdata:Citas;
    let seencontro:boolean = false;

    request.onsuccess = function(event){
      
      var db = request.result;
      var transaccion = db.transaction(['pacientes'],'readonly');
      var consulta = transaccion.objectStore('pacientes');

      var myIndex = consulta.index('identificacion'); 
      var getRequest = myIndex.get(data);
      
      getRequest.onsuccess = function() {
        auxdata = getRequest.result;
        console.log('La informacion  es: ',auxdata);
       
      }

   

    }
    this.pacienteencontrado = seencontro;
  }

  public cargarListasdePacientes(){

  }

  asignarValores(){
    //this.datosDelPaciente.identificacion
  }

  public AsignarNuevaCita(){
    console.log('Se asignara una nueva cita');
    this.api.AgregarNuevaCita(this.datosDelPaciente);

    setTimeout(()=>{
      this.LimpiarCampos();
    },2000);
  }

  public LimpiarCampos(){
    this.datosDelPaciente.identificacion = '';
    this.datosDelPaciente.nombres = '';
    this.datosDelPaciente.apellidos = '';
    this.datosDelPaciente.fecha = '';
    this.datosDelPaciente.hora = '';
    this.datosDelPaciente.telefono = '';
  }

}
