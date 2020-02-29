import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

import { Post } from './post.model';


@Injectable({providedIn: 'root'})
export class PostsService {

  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  creatAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http
    .post(
      // 'https://httpmax-8a9bc.firebaseio.com/posts.json', staro spajanje
      'https://crudzaposlenici.firebaseio.com/posts.json',
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get('https://crudzaposlenici.firebaseio.com/posts.json',
    {
      headers: new HttpHeaders ({'Custom-Header': 'Hello'}),
      params: searchParams,
      responseType: 'json'
    })
    .pipe(map( (responseData: { [key: string]: Post}) => {
      const postArray: Post [] = [];
      for (const data in responseData) {
        if (responseData.hasOwnProperty(data)) {
          postArray.push({id: data , ...responseData[data]});
        }
      }
      return postArray;
    }), catchError(error => {
      return throwError(error);
    })

    );
    // .subscribe(post => {
    // });
  }

  deletePosts() {
     return this.http.delete('https://crudzaposlenici.firebaseio.com/posts.json', {
       observe: 'events',
       responseType: 'json'
     });
  }

  deleteJedanPosts(id: string) {
    this.http.delete('https://crudzaposlenici.firebaseio.com/posts/id:' + id).subscribe(res => {
      console.log(res);
    });
  }

}
