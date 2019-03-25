import { Component, OnInit, Input } from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {CommentsService} from '../../services/comments/comments.service';
import {ToastrService} from '../../services/toastr/toastr.service';
declare const $: any;

@Component({
  selector: 'app-comment-wrapper',
  templateUrl: './comment-wrapper.component.html',
  styleUrls: ['./comment-wrapper.component.css']
})
export class CommentWrapperComponent implements OnInit {

  @Input() commentContent;
  @Input() type;
  isMine = false;

  constructor(private dataService: DataService, private commentsService: CommentsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.commentContent.avatarSrc = this.dataService.getAPI().avatars + this.commentContent.avatar;
    this.isMine = this.commentContent.username === localStorage.getItem('username');
    console.log(this.isMine);
  }

  deleteComment(type){
    console.log(this.commentContent);
    this.commentsService.deleteSelectedComment(this.commentContent.id).subscribe((res:any) => {
      if(!res.success || res === null){
        this.toastr.errorToast(res.msg);
        return;
      }else if(res.success){
        this.toastr.toast(res.msg);
        if(type==='journey'){
          $(`#journeyComment-${this.commentContent.id}`).css('display', 'none');
        }else if(type === 'image'){
          $(`#imageComment-${this.commentContent.id}`).css('display', 'none');
        }
      }

    }, err => {});
  }
}
