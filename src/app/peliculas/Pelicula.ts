import { actorPeliculaDto } from "../actores/Actor";
import { cineDto } from "../cines/cine";
import { generoDto } from "../generos/Genero/Genero";

export interface PeliculaCreacionDto{
    titulo:string,
    resumen:string,
    enCines: boolean,
    fechaLanzamiento: Date,
    trailer: string,
    poster:File,
    generosIds: number[],
    actores: actorPeliculaDto[],
    cinesIds: number[]
}

export interface PeliculaDto{
    titulo:string,
    resumen:string,
    enCines: boolean,
    fechaLanzamiento: Date,
    trailer: string, 
    poster: string
}

export interface PeliculaPostGet{
    generos: generoDto[],
    cines: cineDto[],
}