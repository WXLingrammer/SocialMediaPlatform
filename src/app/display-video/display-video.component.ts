import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-display-video',
  templateUrl: './display-video.component.html',
  styleUrls: ['./display-video.component.css']
})
export class DisplayVideoComponent implements OnInit {
  @Input() post: Post | any;
  @ViewChild('videoPlayer') videoplayer: any;
  isEnded = true;

  constructor() { }

  ngOnInit(): void {
    
  }

  playVideo(event: any) {
    this.videoplayer.nativeElement.play();
    this.videoplayer.nativeElement.volume = 0.05;
    console.log(this.videoplayer.nativeElement.volume);
    this.isEnded = false;
  }

}
