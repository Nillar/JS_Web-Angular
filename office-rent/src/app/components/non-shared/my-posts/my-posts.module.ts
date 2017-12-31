import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {MyPostsRoutingModule} from "./my-posts-routing.module";
import {MyPostsComponent} from "./my-posts.component";

@NgModule({
  imports: [
    MyPostsRoutingModule,
    CommonModule,
    NgxPaginationModule
  ],
  declarations: [MyPostsComponent],
  exports: []
})

export class MyPostsList {
}
