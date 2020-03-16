import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pacientes } from '../models/pacientes';
import { Nuevopaciente } from '../models/nuevopaciente';
import { DblocalService } from '../services/dblocal.service';
import { Historias } from '../models/historias';
import * as moment from 'moment';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

  public identificacionDelPaciente: any;
  public listadepacientes:Pacientes [];

  public nuevopaciente:Nuevopaciente = {
    identificacion:'',
    nombres: '',
    apellidos: '',
    telefono: '',
    dianacimiento: '',
    mesnacimiento: '',
    anionacimiento: '',
    fechadenacimiento: '',
    edad: '',
    genero: '',
    embarazada: '',
    carnet:''
  }

  public nuevaHistoria:Historias = {
    numero:  '',
    nombres:  '',
    apellidos:  '',
    edad:  '',
    genero:  '',
    telefono:  '',
    carnet:  '',
  }

  public misdatos:any = [];
  public fechaActual:any;
  
  public dataJson: any;
  public bdNombre:any = 'appFisioterapia';
  public bdVersion:any = 1;
  dataIndexed:any;

  constructor(
    public navegar : Router,
    public api: DblocalService
  ) { }

  ngOnInit() {
    this.cargarListasdePacientes();
    this.fechaActual = moment().format('DD/MM/YYYY');
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
  public cargarListasdePacientes(){
   
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    let db: any;
    let transaccion: any; 
    let citasAlmacenadas: any;
    let datos:any = [];
    
    request.onsuccess = function(event){
      let resultados:any;
      db = request.result;
      transaccion = db.transaction(["pacientes"], "readonly");
      citasAlmacenadas = transaccion.objectStore('pacientes');
      

      resultados = citasAlmacenadas.openCursor().onsuccess = function(event){
        var cursor = event.target.result;
        //var fecha = moment().format('LT');
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
              <td>`+datos[key].edad+`</td>
              <td>`+datos[key].genero+`</td>
              <td>
                <span>
                  
                  <!--i class="material-icons" href="#" data-toggle="modal" data-target="#exampleModalScrollable">
                    date_range
                    (click)="AgregarNuevoEvento();"
                  </i-->
                  
                  <i class="material-icons"  href="#" data-toggle="modal" data-target="#agregarNuevoEvento" data-toggle="tooltip" data-placement="top" data-html="true" title="Agregar un Nuevo Evento">
                    book
                  </i>
                
                  <i class="material-icons" (click)="ConsultarHistorial();" data-toggle="tooltip" data-placement="top" data-html="true" title="Ver Historial">
                    post_add
                  </i>
                  
                  <i class="material-icons" (click)="CargarEventosdelPaciente();" data-toggle="tooltip" data-placement="top" data-html="true" title="Mostrar Eventos del Paciente">
                    assignment
                  </i>
                </span>
              </td>
            </tr>`;
          }
          datos = [];
          document.querySelector("#dataIndexed").innerHTML = outerHTML;
          
          console.log("¡No hay más registros disponibles!");
        }
      }
    }
  
    request.onerror = function(event){
      console.log ('[onerror]', request.error); 
    }


  }

  public consultarPaciente(){ 
    console.log("la identificacion del pacientes es: ", this.identificacionDelPaciente);
  }

  //Acciones
  public AgregarNuevaCita(){
    console.log("se agregara una nueva cita");
  }

  public AgregarNuevoEvento(){
    console.log("se agregara una nueva evento");
  }

  public ConsultarHistorial(){
    console.log("se consultara su historial");
  }

  public CargarEventosdelPaciente(){
    console.log("se consultara sus eventos");
  }


  public GuardarNuevoPaciente(){
    var anioactual:any = moment().format('YYYY');
    var anionacimiento:any = this.nuevopaciente.anionacimiento;
    var edad = anioactual - anionacimiento;
    
    //console.log('año actual: ',anioactual);
    this.nuevopaciente.edad = edad.toString();
    //console.log('la edad del paciente es: ', this.nuevopaciente.edad);

    this.nuevaHistoria.numero = this.nuevopaciente.identificacion;
    this.nuevaHistoria.nombres = this.nuevopaciente.nombres;
    this.nuevaHistoria.apellidos = this.nuevopaciente.apellidos;
    this.nuevaHistoria.edad = this.nuevopaciente.edad;
    this.nuevaHistoria.genero = this.nuevopaciente.genero;
    this.nuevaHistoria.telefono = this.nuevopaciente.telefono;
    this.nuevaHistoria.carnet =  this.nuevopaciente.carnet;

    this.api.AgregarNuevoPacientes(this.nuevopaciente);
    this.api.AgregarNuevaHistoria(this.nuevaHistoria);
    
    //console.log('se registro un nuevo paciente con los siguientes datos: ',this.nuevopaciente);
    setTimeout(() => {
      this.limpiarInpust();
      this.cargarListasdePacientes();
    },2000);
  }

  public limpiarInpust(){
    this.nuevopaciente.identificacion = '';
    this.nuevopaciente.nombres = '';
    this.nuevopaciente.apellidos = '';
    this.nuevopaciente.telefono = '';
    this.nuevopaciente.dianacimiento = '';
    this.nuevopaciente.mesnacimiento = '';
    this.nuevopaciente.anionacimiento = '';
    this.nuevopaciente.fechadenacimiento = '';
    this.nuevopaciente.edad = '';
    this.nuevopaciente.genero = '';
    this.nuevopaciente.embarazada = '';

    //limpiar los campos de la historia
    this.nuevaHistoria.numero = '';
    this.nuevaHistoria.nombres =  '';
    this.nuevaHistoria.apellidos =  '';
    this.nuevaHistoria.edad =  '';
    this.nuevaHistoria.genero =  '';
    this.nuevaHistoria.telefono =  '';
    this.nuevaHistoria.carnet =  '';
  }

}
