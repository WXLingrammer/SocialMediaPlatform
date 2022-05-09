import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-display-link',
  templateUrl: './display-link.component.html',
  styleUrls: ['./display-link.component.css']
})
export class DisplayLinkComponent implements OnInit {
  @Input() post: Post | any;

  constructor() { }

  ngOnInit(): void {
  }

}
