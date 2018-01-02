import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ReqHandlerService} from "../../../services/req-handler.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'office-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  public offers: any;
  public p: number = 1;
  public offersCount: number;
  public loader: boolean = true;

  constructor(private router: Router,
              private reqHandlerService: ReqHandlerService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.reqHandlerService.getMyOffers().subscribe(data => {
      this.offers = data;
      this.offersCount = this.offers.length;
      this.loader = false;
      this.toastr.success('My Offers Loaded', 'Success');
    }, err => {
      this.toastr.error('Loading unsuccessful', 'Error');
      console.log(err.message);
      this.loader = false;
      return;
    })
  }

  calcTime(dateIsoFormat) {
    let date = new Date(dateIsoFormat);

    function getMonth(month) {
      switch (month) {
        case 1:
          return 'January';
        case 2:
          return 'February';
        case 3:
          return 'March';
        case 4:
          return 'April';
        case 5:
          return 'May';
        case 6:
          return 'June';
        case 7:
          return 'July';
        case 8:
          return 'August';
        case 9:
          return 'September';
        case 10:
          return 'October';
        case 11:
          return 'November';
        case 12:
          return 'December';
      }

    }

    return `${date.getDate()} ${getMonth(date.getMonth() + 1)} ${date.getFullYear()}`;
  }

}
