import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ReqHandlerService} from "../../services/req-handler.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryModel} from "../../models/category.model";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

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
  public categoryExists: boolean = false;
  public loader:boolean = true;

  constructor(private reqHandlerService: ReqHandlerService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.model = new CategoryModel('');
  }

  ngOnInit() {
    this.reqHandlerService.getAllCategories().subscribe(data => {
      this.categoriesArr = data;
      this.categoriesArr.reverse();
      this.categoriesCount = this.categoriesArr.length;
      this.toastr.success('Welcome Admin', 'Success');
      this.loader = false;
    }, err => {
      this.toastr.error('Loading unsuccessful', 'Error');
      this.router.navigate(['/**']);
      return;
    });

    this.createCategory = this.fb.group({
      category: ['', [Validators.minLength(3), Validators.maxLength(25)]]
    })
  }

  delete(id) {
    this.reqHandlerService.deleteCategory(id).subscribe(data => {
      this.reqHandlerService.getAllCategories().subscribe(data2 => {
        this.categoriesArr = data2;
        this.categoriesArr.reverse();
        this.categoriesCount = this.categoriesArr.length;
        this.toastr.warning('Category Deleted');

      }, err => {
        this.toastr.error('Delete unsuccessful', 'Error');
        this.router.navigate(['/**']);
        return;
      });
      this.router.navigate(['/admin']);
      this.createCategory.reset();
    })
  }

  submit() {
    if (this.createCategory.value['category'].length < 3 || this.createCategory.value['category'].length > 25) {
      this.toastr.error('Category must be between 3 and 25 symbols');
      return;
    }
    this.model.category = this.createCategory.value['category'];


    this.categoriesArr.map(data => {
      if (data.category.includes(this.model.category)) {
        this.categoryExists = true;
        this.createCategory.reset();

        return;
      }
    });

    if (this.categoryExists) {
      this.toastr.error('Category already exists');
      this.categoryExists = false;
      this.createCategory.reset();
      return;
    }


    this.reqHandlerService.createCategory(this.model).subscribe(data => {
      this.categoryExists = false;
      this.reqHandlerService.getAllCategories().subscribe(data2 => {
        this.categoriesArr = data2;
        this.categoriesArr.reverse();
        this.categoriesCount = this.categoriesArr.length;
        this.toastr.info('Category created');

      });
      this.router.navigate(['/admin']);
      this.createCategory.reset();
    })
  }

}
