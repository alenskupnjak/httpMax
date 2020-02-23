import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        // moja veza https://httpmax-8a9bc.firebaseio.com/
        'https://httpmax-8a9bc.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
   this.fetchPosts();
  }

  private fetchPosts() {
    this.http.get('https://httpmax-8a9bc.firebaseio.com/posts.json')
    .subscribe(post => {
      console.log(post);
    });
  }

  onClearPosts() {
    // Send Http request
  }



}
