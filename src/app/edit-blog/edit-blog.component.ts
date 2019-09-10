import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blogForm;
  constructor(public activatedRoute:ActivatedRoute,public http:HttpClient,public router:Router) {
    this.blogForm = new FormGroup({
      'title': new FormControl(),
      'Description': new FormControl(),
      'imageURL': new FormControl(),
      'author': new FormControl()
    })
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));

    this.http.get(`https://demobl0g.herokuapp.com/api/blogs/${this.activatedRoute.snapshot.paramMap.get('id')}`)
    .toPromise()
    .then((response:any) => {
      this.blogForm.setValue({
        'title' : response.title,
        'Description' : response.Description,
        'author' : response.author,
        'imageURL' : response.imageURL
      })
    }, (error) => {

    })


    
  }

  postBlog(){
    this.http.put(`https://demobl0g.herokuapp.com/api/blogs/${this.activatedRoute.snapshot.paramMap.get('id')}`,this.blogForm.value)
    .toPromise()
    .then((response) => {
      this.router.navigate(['dashboard/list']);
    },(error) => {

    })
  }

}
