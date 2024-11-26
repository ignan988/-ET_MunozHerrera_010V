import { EventoGlobal } from './eventos'; 

export interface Users {
    id: number;
    username: string;
    email: string;
    password: string;
    rut: string;
    isactive: boolean;
    eventos?: EventoGlobal[]; 
}



export interface UserNuevo{
    username:string;
    email:string;
    password:string;
    rut:string;
    isactive: boolean;
}
