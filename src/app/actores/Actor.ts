export interface actorDto{
    nombre:string,
    fechaNacimiento:Date,
    foto: string,
    id:number;
    biografia:string;
}

export interface actorCreacionDto{
    nombre:string,
    fechaNacimiento:Date,
    foto: File,
    biografia: string;
}

export interface actorPeliculaDto {
    id: number;
    nombre: string;
    personaje: string;
    foto: string
}