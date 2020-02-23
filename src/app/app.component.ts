import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post [] = [];
  isFetchin = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    console.log(postData);
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
    this.isFetchin = true;
    this.http.get('https://httpmax-8a9bc.firebaseio.com/posts.json')
    .pipe(map( (responseData: { [key: string]: Post}) => {
      const postArray: Post [] = [];
      for (const data in responseData) {
        if (responseData.hasOwnProperty(data)) {
          postArray.push({id: data , ...responseData[data]});
        }
      }
      return postArray;
    }))
    .subscribe(post => {
      this.isFetchin = false;
      this.loadedPosts = post;
    });
  }

  onClearPosts() {
    // Send Http request
  }



}
