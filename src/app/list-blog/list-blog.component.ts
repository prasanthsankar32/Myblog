import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {
  blogList;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get('https://demobl0g.herokuapp.com/api/blogs')
      .toPromise()
      .then((response) => {
        this.blogList = response;
      }, (error) => {
        console.log(error);
      })
  }

  deleteBlog(id) {
    let result = confirm("Are you sure do you want to delete?");
    if (result == true) {
      console.log(id);
      this.http.delete(`https://demobl0g.herokuapp.com/api/blogs/${id}`)
        .toPromise()
        .then((response) => {
          console.log(response);
          this.loadData();
        },
          (error) => {
            console.log(error);
          })
    }
  }

}
