//get, put, delete
export interface EventoGlobal {
  id: string;
  nombre: string;
  fecha: string;
  descripcion: string;
  ubicacion: string;
  participantes: string[];
  activo: boolean;
  imagen: string; 
}

  
  
//post
export interface EventoGlobalPost{
    nombre:string,
    descripcion:string,
    fecha:number,
    lugar:string,
    imagen: string
}
