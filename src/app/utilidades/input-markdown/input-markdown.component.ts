import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {
  contenidoMarkDown = '';
  constructor() { }
  @Output()
  changeMarkDown: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

  inputTextArea(texto: string){
    this.contenidoMarkDown = texto;
    this.changeMarkDown.emit(texto);
  }
}
