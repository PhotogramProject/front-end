import {Component, OnInit, Input} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import {JourneyService} from '../../services/journey/journey.service';
import {DomSanitizer} from '@angular/platform-browser';
import {DataService} from '../../services/data/data.service';
import {UtilityService} from '../../services/utility/utility.service';

declare const $: any;

@Component({
  selector: 'app-journey-image', templateUrl: './journey-image.component.html', styleUrls: ['./journey-image.component.css']
})
export class JourneyImageComponent implements OnInit {
  @Input() photo;

  imagePath: string;
  imageComments = [];
  myComment = '';

  constructor(private mapService: MapService, private journeyService: JourneyService, private sanitizer: DomSanitizer, private dataService: DataService, private utility: UtilityService) {
  }

  ngOnInit() {
    this.imagePath = this.dataService.getAPI().uploads + this.photo.fileName;
    this.photo.location = this.photo.location.filter(l => l !== 0);
    this.photo.resolution = this.photo.resolution.filter(r => r !== 0);
    this.photo.displayType = 'details';
    this.mapService.showRetrievedImage(this.photo, this.imagePath);
  }

// Get the image and insert it inside the modal - use its "alt" text as a caption
  showImageModal() {
    this.utility.showImageModal(this.photo.id);
    this.imageComments = [{
      comment: 'This is a square image. Add the "circle" class to it to make it appear circular.This is a square image. Add the "circle" class to it to make it appear circular.This is a square image. Add the "circle" class to it to make it appear circular.This is a square image. Add the "circle" class to it to make it appear circular.This is a square image. Add the "circle" class to it to make it appear circular.This is a square image. Add the "circle" class to it to make it appear circular.',
      date: '08-10-2018',
      name: 'Ivan Ivanov',
      user: 'sample_username',
      avatarSrc: '../../../assets/images/default-avatar.png'
    }, {
      comment: 'This is a square image. Add the "circle" class to it to make it appear circular.',
      date: '08-10-2018',
      name: 'Stoyan Minchev',
      user: 'stomin',
      avatarSrc: '../../../assets/images/default-avatar.png'
    }, {
      comment: 'This is a square image. Add the "circle" class to it to make it appear circular.',
      date: '08-10-2018',
      name: 'Deyan Peychev',
      user: 'deyan_peychev',
      avatarSrc: '../../../assets/images/default-avatar.png'
    }];
  }

// When the user clicks on <span> (x), close the modal
  closeImageModal(className) {
    this.utility.closeImageModal(className);
    this.imageComments = [];
  }

  prepareComment(ev) {
    this.myComment = ev.target.value;
  }

  submitComment() {
    if (this.myComment.trim() !== '') {
      this.imageComments.splice(0, 0, {
        comment: this.myComment,
        user: localStorage.getItem('username'),
        avatarSrc: '../../../assets/images/default-avatar.png'
      });
      $('.commentTextarea').val('');
      this.myComment = '';
    }
  }

}
