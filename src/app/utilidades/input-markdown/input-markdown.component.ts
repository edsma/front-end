import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {
  @Input()
  contenidoMarkDown = '';
  
  @Input()
  placeHolderTextArea: string = 'Texto';
  constructor() { }
  @Output()
  changeMarkDown: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }


}
