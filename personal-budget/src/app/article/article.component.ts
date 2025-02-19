import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pb-article',
  standalone: false,
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  @Input() title = 'Title';
  @Input() content = 'content';
  constructor() { }

  ngOnInit(): void {
  }

}
