import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public showImage: boolean = false;
  public hide: boolean = false;
  public imageBtnText: string = 'Show Image';
  public limit: number = 250;

  @Input() article;
  @Output() deleteArticleEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  textLimit(text){
    return text.slice(0, this.limit);
  }

  showHideImage(){
    if(this.imageBtnText === 'Show Image'){
      this.showImage = true;
      this.imageBtnText = 'Hide Image';
    }
    else if(this.imageBtnText === 'Hide Image'){
      this.showImage = false;
      this.imageBtnText = 'Show Image';
    }
  }

  readMore(){
    if(this.limit >= this.article.text.length){
      this.hide = true;
    }

    this.limit += 250;
  }

  hideText(){
    this.hide = false;
    this.limit = 250;
  }

  deleteArticle(id){
    this.deleteArticleEmitter.emit(id);
  }

}
