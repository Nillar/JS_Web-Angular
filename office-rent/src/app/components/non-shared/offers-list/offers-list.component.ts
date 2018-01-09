import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from "@angular/router";
import {ReqHandlerService} from "../../../services/req-handler.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'office-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {
  public offers: any;
  public categoriesArr: any;
  public category: string;
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
    this.category = '';
    this.reqHandlerService.getAllCategories().subscribe(data=>{
      this.categoriesArr = data;
      // this.loader = false;
    }, err=>{
      this.toastr.error('Could not load categories');
      this.loader = false;
      return;
    });
    this.reqHandlerService.getAllOffers().subscribe(data=>{
      this.offers = data;
      this.offersCount = this.offers.length;
      this.loader = false;
      this.toastr.success('Offers Loaded', 'Success');
    }, err=>{
      this.toastr.error('Loading unsuccessful', 'Error');
      this.loader = false;
      console.log(err.message);
      this.router.navigate(['/**']);
      return;
    });


  }

  onChange(category) {
    this.loader = true;
    this.offers = [];
    this.category = category;
    this.offersCount = 0;
    if(this.category !== 'All Categories'){
      this.reqHandlerService.getAllOffersByCategory(category).subscribe(data=>{
        this.offers = data;
        this.offersCount = this.offers.length;
        this.loader = false;
      }, err=>{
        this.loader = false;
        this.toastr.error('Loading unsuccessful', 'Error');
        return;

      });
    }
    if(this.category === 'All Categories'){
      this.reqHandlerService.getAllOffers().subscribe(data=>{
        this.offers = data;
        this.offersCount = this.offers.length;
        this.loader = false;
      }, err=>{
        this.loader = false;
        this.toastr.error('Loading unsuccessful', 'Error');
        return;
      });
    }
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
