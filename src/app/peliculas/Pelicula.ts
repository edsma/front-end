import { actorDto, actorPeliculaDto } from "../actores/Actor";
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
    id: number,
    titulo:string,
    resumen:string,
    enCines: boolean,
    fechaLanzamiento: Date,
    trailer: string, 
    poster: string,
    generos: generoDto[],
    actores: actorPeliculaDto[],
    cines: cineDto[],
    votoUsuario: number,
    promedioVoto: number
}

export interface PeliculaPostGet{
    generos: generoDto[],
    cines: cineDto[],
}

export interface LandingPageDto{
    enCines: PeliculaDto[],
    proximosEstrenos: PeliculaDto[]
}

export interface PeliculaPutGetDto{
    pelicula: PeliculaDto,
    generosSeleccionados: generoDto[],
    generosNoSeleccionados: generoDto[],
    cinesSeleccionados: cineDto[],
    cinesNoSeleccionados: cineDto[],
    actores: actorPeliculaDto[]
}