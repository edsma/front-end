import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndiceActoresComponent } from './actores/indice-actores/indice-actores.component';
import { CrearGeneroComponent } from './generos/crear-genero/crear-genero.component';
import { IndiceGenerosComponent } from './generos/indice-generos/indice-generos.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {CrearActorComponent} from './actores/crear-actor/crear-actor.component'
import { IndiceCineComponent } from './cines/indice-cine/indice-cine.component';
import { CrearCineComponent } from './cines/crear-cine/crear-cine.component';
import { CrearPeliculaComponent } from './peliculas/crear-pelicula/crear-pelicula.component';
import { EditarActorComponent } from './actores/editar-actor/editar-actor.component';
import { EditarPeliculaComponent } from './peliculas/editar-pelicula/editar-pelicula.component';
import { EditarCineComponent } from './cines/editar-cine/editar-cine.component';
import { EditarGeneroComponent } from './generos/editar-genero/editar-genero.component';
import { FiltroPeliculasComponent } from './peliculas/filtro-peliculas/filtro-peliculas.component';
import { DetallePeliculaComponent } from './peliculas/detalle-pelicula/detalle-pelicula.component';
import { LoginComponent } from './seguridad/login/login.component';
import { EsAdminGuard } from './es-admin.guard';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { IndiceUsuariosComponent } from './seguridad/indice-usuarios/indice-usuarios.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent}, 
  {path: 'generos', component: IndiceGenerosComponent},
  {path: 'generos/crear', component: CrearGeneroComponent }, 
  {path: 'generos/editar/:id', component: EditarGeneroComponent},

  {path: 'actores', component: IndiceActoresComponent },
  {path: 'actores/crear', component:  CrearActorComponent  },
  {path: 'actores/editar/:id', component:  EditarActorComponent  },

  {path: 'cines', component: IndiceCineComponent },
  {path: 'cine/crear', component: CrearCineComponent},
  {path: 'cine/editar/:id', component: EditarCineComponent },

  {path: 'peliculas/crear', component: CrearPeliculaComponent },
  {path: 'peliculas/editar/:id', component: EditarPeliculaComponent},
  {path: 'peliculas/buscar', component: FiltroPeliculasComponent},
  {path: 'peliculas/:id', component: DetallePeliculaComponent },
  {path: 'login', component: LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'usuarios', component:IndiceUsuariosComponent},
  {path: '**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
