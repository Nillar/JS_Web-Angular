import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OfferModel} from "../../../models/offer.model";
import {ReqHandlerService} from "../../../services/req-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'office-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  public edit: FormGroup;
  public model: OfferModel;
  public category: string;
  public categoriesArr: any;
  public formErrors: boolean = true;
  public currentOffer: Object;
  public offerId: string;
  public sellerEmail: string;
  public loader: boolean = true;

  constructor(private fb: FormBuilder,
              private reqHandlerServer: ReqHandlerService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.model = new OfferModel('', '', '', '', '', '', 0, 0, '', '')
  }

  ngOnInit() {
    this.sellerEmail = localStorage.getItem('email');
    this.offerId = this.route.snapshot.paramMap.get('id');
    this.categoriesArr=[];
    this.reqHandlerServer.getOfferDetails(this.offerId).subscribe(data => {
      this.currentOffer = data;
      this.loader = false;
      this.model.author = localStorage.getItem('username');
      this.category = data['category'];
      this.model.sellerName = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');

      this.edit = this.fb.group({
        title: [data['title'], [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
        image: [data['image']],
        address: [data['address'], [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
        description: [data['description'], [Validators.required, Validators.minLength(15), Validators.maxLength(400)]],
        price: [data['price'], [Validators.required, Validators.min(1), Validators.max(99999)]],
        area: [data['area'], [Validators.required, Validators.min(15), Validators.max(50000)]],
        sellerPhone: [data['sellerPhone'], [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      });
    }, err=>{
      this.toastr.error('No offer with this id');
      this.router.navigate(['/offers']);
      this.loader = false;
      return;
    });

    this.edit = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      image: ['',],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(400)]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(99999)]],
      area: ['', [Validators.required, Validators.min(15), Validators.max(50000)]],
      sellerPhone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.reqHandlerServer.getAllCategories().subscribe(data => {
      for (let obj in data) {
       this.categoriesArr.push(data[obj]['category'])
      }
    })
  }

  onChange(category) {
    this.category = category;
  }

  submit(): void {

    if (this.edit.value['image'] === '' || !this.edit.value['image'].startsWith('http')) {
      this.model.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
    }

    if (this.edit.value['image'].startsWith('http')) {
      this.model.image = this.edit.value['image'];

    }

    this.model.author = localStorage.getItem('username');
    this.model.title = this.edit.value['title'];
    this.model.address = this.edit.value['address'];
    this.model.description = this.edit.value['description'];
    this.model.category = this.category;
    this.model.price = this.edit.value['price'];
    this.model.area = this.edit.value['area'];
    this.model.sellerName = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    this.model.sellerPhone = this.edit.value['sellerPhone'];

    this.loader = true;

    if (this.model.title.length < 4 || this.model.title.length > 30) {
      this.toastr.error('Title must be between 4 and 30 symbols');
      console.log('Title must be between 4 and 30 symbols');
      this.loader = false;

      this.formErrors = true;
      return;
    }
    if (this.model.address.length < 5 || this.model.address.length > 40) {
      this.toastr.error('Address must be between 5 and 40 symbols');
      console.log('Address must be between 5 and 40 symbols');
      this.loader = false;
      this.formErrors = true;
      return;
    }

    if (this.model.description.length < 15 || this.model.description.length > 400) {
      this.toastr.error('Descrition must be between 15 and 400 symbols');
      console.log('Descrition must be between 15 and 400 symbols');
      this.loader = false;
      this.formErrors = true;
      return;
    }

    if (!Number.isInteger(this.model.price)) {
      this.toastr.error('Price must be a number');
      console.log('Price must be a number');
      this.formErrors = true;
      this.loader = false;
      return;
    }

    if (!Number.isInteger(this.model.area)) {
      this.toastr.error('Area must be a number');
      console.log('Area must be a number');
      this.loader = false;
      this.formErrors = true;
      return;
    }

    if(!this.categoriesArr.includes(this.category)){
      this.toastr.error('Select a valid category');
      console.log('Select a valid category');
      this.loader = false;
      this.formErrors = true;
      return;
    }

    if (this.model.sellerPhone.length < 6 || this.model.sellerPhone.length > 20) {
      this.toastr.error('Phone must be between 6 and 20 symbols');
      console.log('Phone must be between 6 and 20 symbols');
      this.loader = false;
      this.formErrors = true;
      return;
    }

    this.formErrors = false;
    this.toastr.info('Loading...');
    this.loader = true;

    if (!this.formErrors) {
      this.reqHandlerServer.editOffer(this.model, this.offerId).subscribe(data => {
        this.loader = false;
        this.router.navigate([`/offers/${this.offerId}`])
      }, err => {
        this.loader = false;
        this.toastr.error('Edit unsuccessful', 'Error');
        console.log(err.message);
        return;
      })
    }
  }
}
