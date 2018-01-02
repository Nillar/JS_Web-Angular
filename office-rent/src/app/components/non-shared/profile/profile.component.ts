import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReqHandlerService} from "../../../services/req-handler.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EditProfileModel} from "../../../models/edit-profile.model";
import {ToastsManager} from "ng2-toastr";

const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


@Component({
  selector: 'office-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public editProfile: FormGroup;
  public model: EditProfileModel;
  public offers: any;
  public p: number = 1;
  public offersCount: number;
  public username: string;
  public userId: string;
  public currentUser: Object;
  public isCurrentUser: boolean = false;
  public editInfo: boolean = false;
  public loader: boolean = true;

  constructor(private router: Router,
              private reqHandlerService: ReqHandlerService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.model = new EditProfileModel('', '', '', '', '', '');
    this.toastr.setRootViewContainerRef(vcr);
    this.username = this.route.snapshot.paramMap.get('username');
  }


  ngOnInit() {
    if (this.username === localStorage.getItem('username')) {
      this.isCurrentUser = true;
    }
    this.editProfile = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(new RegExp(emailPattern))]],
      personalInfo: ['', [Validators.maxLength(400)]]
    })


    this.reqHandlerService.getUserDetails(this.username).subscribe(data => {
      this.currentUser = data[0];
      this.userId = data[0]._id;
      this.model.email = data[0].email;
      this.model.personalInfo = data[0].personalInfo;
      this.model.firstName = data[0].firstName;
      this.model.lastName = data[0].lastName;
      this.model.role = data[0].role;
      this.model.username = data[0].username;

      this.editProfile = this.fb.group({
        email: [data[0].email, [Validators.required, Validators.pattern(new RegExp(emailPattern))]],
        personalInfo: [data[0].personalInfo, [Validators.maxLength(400)]]
      });


    },
      err=>{
        this.toastr.error('Loading unsuccessful', 'Error');
        console.log(err.message);
        window.location.reload();
        return;
      });
    this.reqHandlerService.getOffersByUsername(this.username).subscribe(data => {
      this.offers = data;
      this.offersCount = this.offers.length;
      this.loader = false;
      this.toastr.success('Profile Loaded', 'Success');
    }, err => {
      this.toastr.error('Loading unsuccessful', 'Error');
      console.log(err.message);
      window.location.reload();
      return;
    });



  }

  editInfoClicked() {
    if (this.editInfo === false) {
      return this.editInfo = true;
    }
    return this.editInfo;
  }

  saveInfoClicked() {
    this.editInfo = false;
    this.model.email = this.editProfile.value['email'];
    this.model.personalInfo = this.editProfile.value['personalInfo'];

    if (this.model.personalInfo.length > 400) {
      this.toastr.error('Personal Info must be max 400 symbols', 'Error');
      return;
    }
    this.loader = true;

    this.reqHandlerService.editMyProfile(this.model, this.userId).subscribe(data => {
      localStorage.setItem('authtoken', data['_kmd']['authtoken']);
      localStorage.setItem('email', data['email']);
      this.toastr.success('Edit successful', 'Success');

      this.reqHandlerService.getUserDetails(this.username).subscribe(data2 => {
        this.currentUser = data2[0];

        this.editProfile = this.fb.group({
          email: [data2[0].email, [Validators.required, Validators.pattern(new RegExp(emailPattern))]],
          personalInfo: [data2[0].personalInfo, [Validators.maxLength(400)]]
        });

        this.model.email = data2[0].email;
        this.model.personalInfo = data2[0].personalInfo;
        this.model.firstName = data2[0].firstName;
        this.model.lastName = data2[0].lastName;
        this.model.role = data2[0].role;

        this.loader = false;
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
