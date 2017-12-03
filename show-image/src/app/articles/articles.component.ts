import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  @Input() article;
  @Output() selection: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  getData(articleId){
    this.selection.emit(articleId);
  }

}
