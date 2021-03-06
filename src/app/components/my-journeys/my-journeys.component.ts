import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {JourneyService} from '../../services/journey/journey.service';
import {ToastrService} from '../../services/toastr/toastr.service';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';


@Component({
  selector: 'app-my-journeys',
  templateUrl: './my-journeys.component.html',
  styleUrls: ['./my-journeys.component.css']
})
export class MyJourneysComponent implements OnInit {
  journeysArr = [];
  searchedJourney: string;
  isListening = true;
  journeysCount = 0;
  upcommingResults = true;
  limitCount = 5;

  constructor(private auth: AuthService, private journeyService: JourneyService, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if(!this.auth.pathAuthProtector()){
      return;
    }
    this.retreiveJourneys();
  }

  retreiveJourneys(){
    this.journeyService.getUserJourneys(localStorage.getItem('username'), this.journeysCount).subscribe((res: any) => {
      if(res.data.length < this.limitCount){
        this.upcommingResults = false;
      }

      for (let el of res.data){
        this.journeysArr.push(el);
        this.journeysCount++;
      }
    }, err => {
      this.isListening = false;
      this.toastr.errorToast((err.error.description ? err.error.description : 'Възникна грешка, моля опитайте отново'));
    });

  }

  loadMoreJourneys() {
    if(this.isListening && !this.upcommingResults){
      this.retreiveJourneys();
    }
  }
  scrollToTop(){
    window.scrollTo(0,0);
  }

}
