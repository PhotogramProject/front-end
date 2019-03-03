import { Component, OnInit, Input } from '@angular/core';
import {DataService} from '../../services/data/data.service';

@Component({
  selector: 'app-comment-wrapper',
  templateUrl: './comment-wrapper.component.html',
  styleUrls: ['./comment-wrapper.component.css']
})
export class CommentWrapperComponent implements OnInit {

  @Input() commentContent;
  @Input() type;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.commentContent.avatarSrc = this.dataService.getAPI().avatars + this.commentContent.avatar;
  }

}
