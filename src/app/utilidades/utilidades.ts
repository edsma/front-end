export function toBase64(file: File){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        
    });
}

export function parsearErroresApi(response: any): string[]{
    const resultado:string[] = [];
    if(response.error){
        if(typeof response.error ===  'string'){
            resultado.push(response.error);
        }else{
            const mapaErrores = response.error.errors;
            const entradas = Object.entries(mapaErrores);
            entradas.forEach((arreglo: any[]) => {
                const campo = arreglo[0];
                arreglo[1].forEach(mensajeError => {
                    resultado.push(`${campo}: ${mensajeError}`);
                })
            });
        }
    }

    return resultado;
}