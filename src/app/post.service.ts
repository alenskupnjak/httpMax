import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  creatAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
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

  fetchPosts() {
    return this.http.get('https://httpmax-8a9bc.firebaseio.com/posts.json')
    .pipe(map( (responseData: { [key: string]: Post}) => {
      const postArray: Post [] = [];
      for (const data in responseData) {
        if (responseData.hasOwnProperty(data)) {
          postArray.push({id: data , ...responseData[data]});
        }
      }
      return postArray;
    }));
    // .subscribe(post => {

    // });

  }

}
