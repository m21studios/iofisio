import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DblocalService {
  public bdNombre:any = 'appFisioterapia';
  public bdVersion:any = 1;

  constructor() { }

  comprobarIndexdb(){
    if(self.indexedDB){
      console.log('la base de datos IndexDB es soportada');
    }
  }

  AbrirBaseDeDatos(){
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);

    request.onsuccess = (event) =>{
      console.log ('[onsuccess]', request.result); 
    }

    request.onerror = function(event){
      console.log ('[onerror]', request.error); 
    }

    request.onupgradeneeded = function (event) { 
      var db = request.result; 
      var storecitas = db.createObjectStore ('citas', {keyPath: 'id', autoIncrement: true});
      var storepacientes = db.createObjectStore('pacientes', {keyPath: 'id', autoIncrement: true});
      var storehistorial = db.createObjectStore('historias', {keyPath: 'id', autoIncrement: true});
      var storeEventos = db.createObjectStore('eventos', {keyPath: 'id', autoIncrement: true}); 
      //Indices para realziar Consultas
      var indicesCitas = storecitas.createIndex("fecha","fecha",{unique:false});
      var indicesPacientes = storepacientes.createIndex("identificacion","identificacion",{unique:true});
      var indecesHistorias = storehistorial.createIndex("numero","numero",{unique:true});
      var indicesEventos = storeEventos.createIndex("numerohistorial","numerohistorial",{unique:false});
    }; 

  }

  //Agregar a la base de datos
  AgregarNuevaCita(datos:any){
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    

    request.onsuccess = function (event) { 
      console.log ('[onsuccess]', request.result); 
      let db = request.result;

      var transacción = db.transaction ('citas', 'readwrite');
      var citasStore = transacción.objectStore ('citas');
      
      citasStore.add (datos); // IDBRequest 
    
    };

    request.onerror = function(event){
      console.log ('[onerror]', request.error); 
    }

  }

  //Agregar nueva Historia Clinica
  AgregarNuevaHistoria(datos:any){
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    

    request.onsuccess = function (event) { 
      console.log ('[onsuccess]', request.result); 
      let db = request.result;

      var transacción = db.transaction ('historias', 'readwrite');
      var historiasStore = transacción.objectStore ('historias');
      
      historiasStore.add (datos); // IDBRequest 
    
    };

    request.onerror = function(event){
      console.log ('[onerror]', request.error); 
    }
  }

  //Agregar nuevo Paciente
  AgregarNuevoPacientes(datos:any){
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    

    request.onsuccess = function (event) { 
      console.log ('[onsuccess]', request.result); 
      let db = request.result;

      var transacción = db.transaction ('pacientes', 'readwrite');
      var pacientesStore = transacción.objectStore ('pacientes');
      
      pacientesStore.add (datos); // IDBRequest 
    
    };

    request.onerror = function(event){
      console.log ('[onerror]', request.error); 
    }
  }

  //Agregar Nuevo Evento
  AgregarNuevoEventoAlPaciente(datos:any){
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    

    request.onsuccess = function (event) { 
      console.log ('[onsuccess]', request.result); 
      let db = request.result;

      var transacción = db.transaction ('evento', 'readwrite');
      var pacientesStore = transacción.objectStore ('evento');
      
      pacientesStore.add (datos); // IDBRequest 
    
    };

    request.onerror = function(event){
      console.log ('[onerror]', request.error); 
    }
  }

  //Obtener datos de la base de datos
  ObtenerLasCitas(): Promise<any>{
    let request = self.indexedDB.open(this.bdNombre,this.bdVersion);
    let db: any;
    let transaccion: any; 
    let citasAlmacenadas: any;
    let resultados: any = [];
    

    return new Promise( (res: any) => {
      request.onsuccess = function(event){

        db = request.result;
        transaccion = db.transaction(["citas"]);
        citasAlmacenadas = transaccion.objectStore('citas');
  
        resultados = citasAlmacenadas.getAll();
        
        resultados.onsuccess = function(event){      
          this.data = event.target.result;
          console.log('DATA #### ', this.data);
        }
    
      }
  
      request.onerror = function(event){
        console.log ('[onerror]', request.error); 
      }
    });    
  }



}
