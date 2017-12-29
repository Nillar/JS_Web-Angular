import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Form} from '@angular/forms/src/directives/form_interface'
import {Router} from "@angular/router";
import {ReqHandlerService} from "../../../services/req-handler.service";
import {CategoryModel} from "../../../models/category.model";

@Component({
  selector: 'office-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public categoryName: FormGroup;
  public model: CategoryModel;

  constructor(
    // private router: Router,
    // private fb: FormBuilder,
    // private reqHandlerService: ReqHandlerService
  ) {
    // this.model = new CategoryModel('');
  }

  ngOnInit() {
    // this.categoryName = this.fb.group({
    //   category: ['',[Validators.required]]
    // })
  }

  // submit(){
  //   this.model.category = this.categoryName.value['category'];
  //
  //   this.reqHandlerService.createCategory(this.model).subscribe(data=>{
  //     console.log(data);
  //   })
  // }

}
