import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReqHandlerService} from "../../../services/req-handler.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentModel} from "../../../models/comment.model";

@Component({
  selector: 'office-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  public offerId: string;
  public offer: Object;
  public username: string;
  public comment: FormGroup;
  public model: CommentModel;
  public offerComments: Object;
  public sellerEmail: string;
  public isAuthor: boolean = false;
  public profileLink: string;
  public isAdmin: boolean = false;
  // public anotherUserAccountLink: string;

  constructor(private router: Router, private route: ActivatedRoute, private reqHandlerService: ReqHandlerService, private fb: FormBuilder) {
    this.username = localStorage.getItem('username');
    this.model = new CommentModel('', '', '');
  }


  ngOnInit() {
    if(localStorage.getItem('role') === 'admin'){
      this.isAdmin = true;
    }

    console.log(this.isAdmin);
    this.sellerEmail = localStorage.getItem('email');
    this.offerId = this.route.snapshot.paramMap.get('id');
    this.comment = this.fb.group({
      content: ['', [Validators.minLength(1), Validators.maxLength(200)]]
    });

    this.reqHandlerService.getOfferDetails(this.offerId).subscribe(data => {
      this.profileLink = `/profile/${data['author']}`;

      this.offer = data;
      if(this.offer['author'] === localStorage.getItem('username')){
        this.isAuthor = true;
      }

    });
    this.reqHandlerService.getOfferComments(this.offerId).subscribe(data=>{
      this.offerComments = data;
    })
  }

  anotherUserAccountLink(username){
    this.router.navigate([`/profile/${username}`]);
  }

  submit() {
    this.model.content = this.comment.value.content;
    this.model.author = this.username;
    this.model.postId = this.offerId;

    this.reqHandlerService.createComment(this.model).subscribe(data =>{
      this.reqHandlerService.getOfferComments(this.offerId).subscribe(data=>{
        this.offerComments = data;
      });
      this.router.navigate([`/offers/${this.offerId}`]);
      this.comment.reset();
    })
  }

  edit(id){
    this.router.navigate([`/edit/${id}`]);
  }

  delete(id){
    this.reqHandlerService.deleteOffer(id).subscribe(data=>{
      this.reqHandlerService.deleteAllOfferComments(this.offerId).subscribe(data2 =>{
        this.router.navigate(['/offers']);
      })
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
