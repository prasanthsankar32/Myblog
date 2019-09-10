import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-create-blog",
  templateUrl: "./create-blog.component.html",
  styleUrls: ["./create-blog.component.css"]
})
export class CreateBlogComponent implements OnInit {
  blogForm;
  constructor(public http: HttpClient, public router: Router) {}

  ngOnInit() {
    this.blogForm = new FormGroup({
      title: new FormControl(),
      Description: new FormControl(),
      imageURL: new FormControl(),
      author: new FormControl()
    });
  }

  postBlog() {
    console.log(this.blogForm.value);
    this.http
      .post("https://demobl0g.herokuapp.com/api/blogs", this.blogForm.value)
      .toPromise()
      .then(
        response => {
          console.log(response);
          this.router.navigate(["dashboard/list"]);
        },
        error => {
          console.log(error);
        }
      );
  }
}
