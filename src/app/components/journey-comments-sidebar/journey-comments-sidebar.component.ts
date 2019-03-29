import {Component, OnInit, Input} from '@angular/core';
import {ToastrService} from '../../services/toastr/toastr.service';
import {AdminService} from '../../services/admin/admin.service';
import {DataService} from '../../services/data/data.service';
import {CommentsService} from '../../services/comments/comments.service';

declare const $: any;

@Component({
  selector: 'app-journey-comments-sidebar',
  templateUrl: './journey-comments-sidebar.component.html',
  styleUrls: ['./journey-comments-sidebar.component.css']
})
export class JourneyCommentsSidebarComponent implements OnInit {
  @Input() journeyID;

  constructor(private toastr: ToastrService, private adminService: AdminService,
              private dataService: DataService, private commentsService: CommentsService) {
  }

  journeyComments = [];
  type = 'journey';
  sidebarOpened = false;
  myComment = '';
  upcommingResults = true;
  commentsCount = 0;
  limitCount = 8;

  ngOnInit() {
    this.retrieveComments();
  }

  retrieveComments(){
    if(this.upcommingResults){
      this.commentsService.retrieveComments(this.type , this.journeyID, this.commentsCount).subscribe((res: any) => {
        if (res.data.length < this.limitCount) {
          this.upcommingResults = false;
        }
        for (let el of res.data) {
          this.journeyComments.push(el);
          this.commentsCount++;
        }
      }, err => {
        this.upcommingResults = false;
        this.toastr.errorToast((err.error.description ? err.error.description : 'Възникна грешка, моля опитайте отново'));
      });
    }
  }

  loadMoreComments() {
    if (this.upcommingResults) {
      this.retrieveComments();
    }
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '100%';
    this.sidebarOpened = true;
  }

  closeNav() {
    this.sidebarOpened = false;
    document.getElementById('mySidenav').style.width = '0';
  }

  prepareComment(ev) {
    this.myComment = ev.target.value;
  }

  submitComment() {
    if (this.myComment.trim() !== '') {
      this.commentsService.addComment({
        content: this.myComment,
        type: 'journey',
        property_id: Number(this.journeyID),
        author: Number(localStorage.getItem('userId')),
        date_added: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + (new Date().getDate())).slice(-2)}`
      }).subscribe((res: any) => {
        let commentID = res.data.id;
        if (!res.success || res === null) {
          this.toastr.errorToast(res.msg);
        } else {
          this.toastr.successToast(res.msg);
          this.adminService.getUserByUsername(localStorage.getItem('username')).subscribe((res: any) => {
            this.journeyComments.unshift({
              id: commentID,
              content: this.myComment,
              dateAdded: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + (new Date().getDate())).slice(-2)}`,
              author: localStorage.getItem('name'),
              username: localStorage.getItem('username'),
              avatar: res.data.avatar
            });
            $('.commentTextarea').val('');
            this.myComment = '';
          });
        }
      });
    }
  }
}
