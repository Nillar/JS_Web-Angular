import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, Form} from "@angular/forms";
import {OfferModel} from "../../../models/offer.model";
import {ReqHandlerService} from "../../../services/req-handler.service";
import {Router} from "@angular/router";

@Component({
  selector: 'office-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  public create: FormGroup;
  public model: OfferModel;


  constructor(private fb: FormBuilder,
              private reqHandlerServer: ReqHandlerService,
              private router: Router) {
    this.model = new OfferModel('', '', '', '', 0, 0, '', '')
  }

  ngOnInit() {
    this.create = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      image: ['',],
      address: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      description: ['',[Validators.required, Validators.minLength(15), Validators.maxLength(400)]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(99999)]],
      area: ['', [Validators.required, Validators.min(15), Validators.max(50000)]],
      sellerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      sellerPhone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  submit(): void {

    if(this.create.value['image'].startsWith('http')){
      this.model.image = this.create.value['image'];
    }

    if(this.create.value['image'] === ''){
      this.model.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
    }

    this.model.title = this.create.value['title'];
    this.model.address = this.create.value['address'];
    this.model.description = this.create.value['description'];
    this.model.price = this.create.value['price'];
    this.model.area = this.create.value['area'];
    this.model.sellerName = this.create.value['sellerName'];
    this.model.sellerPhone = this.create.value['sellerPhone'];

    this.reqHandlerServer.createOffer(this.model).subscribe(data =>{
      this.router.navigate(['/offers'])
    }, err =>{
      console.log(err.message)
    })
  }

}
