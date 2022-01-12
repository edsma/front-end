import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor() { }
  control:FormControl = new FormControl();

  actores = [
    {nombre:'Tom Holland',element:'' ,foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tom_Holland_MTV_2018_%2801%29.jpg/200px-Tom_Holland_MTV_2018_%2801%29.jpg'},
    {nombre:'Emma watson',element:'', foto:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/emma-watson-1-1634550060.jpg'}
  ];

  actoresOriginal = this.actores;
  actoresSeleccionados = [];
  columnasAMostrar  = ['imagen', 'nombre','personaje','acciones'];
  @ViewChild(MatTable) table: MatTable<any>;
  ngOnInit(): void {
      this.control.valueChanges.subscribe(valor => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !== -1);
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre ===  actor.nombre);
    this.actoresSeleccionados.splice(indice);
    this.table.renderRows();
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor == event.item.data
    );
    moveItemInArray(this.actoresSeleccionados, indicePrevio,event.currentIndex);
    this.table.renderRows();
  }

}
