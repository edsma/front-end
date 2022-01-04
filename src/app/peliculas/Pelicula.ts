export interface PeliculaCreacionDto{
    titulo:string,
    resumen:string,
    enCines: boolean,
    fechaLanzamiento: Date,
    trailer: string
    poster:File
}

export interface PeliculaDto{
    titulo:string,
    resumen:string,
    enCines: boolean,
    fechaLanzamiento: Date,
    trailer: string, 
    poster: string
}