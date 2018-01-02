import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, Form} from "@angular/forms";
import {OfferModel} from "../../../models/offer.model";
import {ReqHandlerService} from "../../../services/req-handler.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'office-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  public create: FormGroup;
  public model: OfferModel;
  public category: string;
  public categoriesArr: any;
  public formErrors: boolean = true;
  public loader: boolean = true;

  constructor(private fb: FormBuilder,
              private reqHandlerService: ReqHandlerService,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.model = new OfferModel('','', '', '','', '', 0, 0, '', '')
  }

  ngOnInit() {
    this.categoriesArr=[];
    this.loader = false;
    this.create = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      image: ['',],
      address: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      description: ['',[Validators.required, Validators.minLength(15), Validators.maxLength(400)]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(99999)]],
      area: ['', [Validators.required, Validators.min(15), Validators.max(50000)]],
      sellerPhone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.reqHandlerService.getAllCategories().subscribe(data=>{
      for (let obj in data) {
        this.categoriesArr.push(data[obj]['category'])
      }
    })
  }

  onChange(category) {
    this.category = category;
  }

  submit(): void {

    if(this.create.value['image'] === '' || !this.create.value['image'].startsWith('http')){
      this.model.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
    }

    if(this.create.value['image'].startsWith('http')){
      this.model.image = this.create.value['image'];

    }
    this.model.author = localStorage.getItem('username');
    this.model.title = this.create.value['title'];
    this.model.address = this.create.value['address'];
    this.model.description = this.create.value['description'];
    this.model.category = this.category;
    this.model.price = this.create.value['price'];
    this.model.area = this.create.value['area'];
    this.model.sellerName = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    // this.model.sellerEmail = localStorage.getItem('email');
    this.model.sellerPhone = this.create.value['sellerPhone'];

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
    if(!this.formErrors){

      this.reqHandlerService.createOffer(this.model).subscribe(data =>{
        this.router.navigate(['/offers']);
        this.loader = false;
      }, err =>{
        console.log(err.message)
      })
    }
  }
}
