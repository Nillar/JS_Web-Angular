import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReqHandlerService} from "../../../services/req-handler.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentModel} from "../../../models/comment.model";
import {ToastsManager} from "ng2-toastr";

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
  public loader: boolean = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private reqHandlerService: ReqHandlerService,
              private fb: FormBuilder,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.username = localStorage.getItem('username');
    this.model = new CommentModel('', '', '');
  }


  ngOnInit() {
    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    }
    this.model.content = '';

    this.sellerEmail = localStorage.getItem('email');
    this.offerId = this.route.snapshot.paramMap.get('id');
    this.comment = this.fb.group({
      content: ['', [Validators.minLength(1), Validators.maxLength(200)]]
    });

    this.reqHandlerService.getOfferDetails(this.offerId).subscribe(data => {
      this.profileLink = `/profile/${data['author']}`;
      this.toastr.success('Details Loaded', 'Success');
      this.offer = data;
      if (this.offer['author'] === localStorage.getItem('username')) {
        this.isAuthor = true;
      }
    }, err => {
      this.toastr.error('Loading unsuccessful', 'Error');
      console.log(err.message);
      this.loader = false;
      this.router.navigate(['/**']);
      return;

    });
    this.reqHandlerService.getOfferComments(this.offerId).subscribe(data => {
      this.offerComments = data;
      this.loader = false;
    },err=>{
      this.loader = false;
      this.toastr.info('Could not load comments');
      return;
    });
  }

  anotherUserAccountLink(username) {
    this.router.navigate([`/profile/${username}`]);
  }

  submit() {
    this.model.content = this.comment.value.content;
    this.model.author = this.username;
    this.model.postId = this.offerId;

    if (this.model.content.length < 1 || this.model.content.length > 200) {
      this.toastr.error('Comment must be between 1 and 200 symbols', 'Error');
      return;
    }

    this.reqHandlerService.createComment(this.model).subscribe(data => {
      this.reqHandlerService.getOfferComments(this.offerId).subscribe(data => {
        this.offerComments = data;
        this.toastr.success('Comment Created', 'Success');
        this.model.content='';
        this.comment = this.fb.group({
          content: ['', [Validators.minLength(1), Validators.maxLength(200)]]
        });
      });
      this.router.navigate([`/offers/${this.offerId}`]);

      this.comment.reset();
    });
  }

  edit(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteOffer(id) {
    this.loader = true;
    this.reqHandlerService.deleteOffer(id).subscribe(data => {
      this.toastr.info('Delete successful', 'Info');
      this.reqHandlerService.deleteAllOfferComments(this.offerId).subscribe(data2 => {
        this.loader = false;
        this.router.navigate(['/offers']);

      }, err2=> {
        this.toastr.error('Deleting comments failed', 'Error');
        this.loader = false;
        return;
      })
    }, err=>{
      this.toastr.error('Deleting offer failed', 'Error');
      this.loader = false;
      return;
    })
  }

  deleteComment(id) {
    this.router.navigate([`/offers/${this.offerId}`]);
    this.reqHandlerService.deleteComment(id).subscribe(data=>{
      this.reqHandlerService.getOfferComments(this.offerId).subscribe(data2 => {
        this.toastr.info('Comment Deleted');
        this.offerComments = data2;
        this.comment = this.fb.group({
          content: ['', [Validators.minLength(1), Validators.maxLength(200)]]
        });
      }, err2=>{
        this.toastr.error("Failed to load offer comments");
        this.loader = false;
      });
      this.comment.reset();
    }, err=>{
      this.toastr.error('Failed to delete comment');
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
