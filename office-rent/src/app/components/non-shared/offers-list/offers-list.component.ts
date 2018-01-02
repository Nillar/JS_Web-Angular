import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReqHandlerService} from "../../../services/req-handler.service";

@Component({
  selector: 'office-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {
  public offers: any;
  public p: number = 1;
  public offersCount: number;
  public loader: boolean = true;

  constructor(private router: Router, private reqHandlerService: ReqHandlerService) { }

  ngOnInit() {
    this.reqHandlerService.getAllOffers().subscribe(data=>{
      this.offers = data;
      this.offersCount = this.offers.length;
      this.loader = false;
    }, err=>{
      console.log(err.message);
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
    return `${date.getDate()} ${getMonth(date.getMonth()+1)} ${date.getFullYear()}`;
  }

}
