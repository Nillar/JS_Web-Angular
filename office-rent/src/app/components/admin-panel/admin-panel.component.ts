import {Component, OnInit} from '@angular/core';
import {ReqHandlerService} from "../../services/req-handler.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryModel} from "../../models/category.model";
import {Router} from "@angular/router";

@Component({
  selector: 'office-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public model: CategoryModel;
  public createCategory: FormGroup;
  public categoriesArr: any;
  public p: number = 1;
  public categoriesCount: number;


  constructor(private reqHandlerService: ReqHandlerService, private fb: FormBuilder, private router: Router) {
    this.model = new CategoryModel('');
  }

  ngOnInit() {
    this.reqHandlerService.getAllCategories().subscribe(data => {
      this.categoriesArr = data;
      this.categoriesArr.reverse();
      this.categoriesCount = this.categoriesArr.length;
    });

    this.createCategory = this.fb.group({
      category: ['', [Validators.minLength(3), Validators.maxLength(25)]]
    })
  }

  delete(id) {
    console.log(id);
    this.reqHandlerService.deleteCategory(id).subscribe(data => {
      this.reqHandlerService.getAllCategories().subscribe(data2 => {
        this.categoriesArr = data2;
        this.categoriesArr.reverse();
        this.categoriesCount = this.categoriesArr.length;

      });
      this.router.navigate(['/admin']);
      this.createCategory.reset();
    })
  }

  submit() {
    if (this.createCategory.value['category'].length < 3 || this.createCategory.value['category'].length > 25) {
      console.log('Category must be between 3 and 15 symbols');
      return;
    }
    this.model.category = this.createCategory.value['category'];


    this.reqHandlerService.createCategory(this.model).subscribe(data => {
      this.reqHandlerService.getAllCategories().subscribe(data2 => {
        this.categoriesArr = data2;
        this.categoriesArr.reverse();
        this.categoriesCount = this.categoriesArr.length;
      });
      this.router.navigate(['/admin']);
      this.createCategory.reset();
    })
  }

}
