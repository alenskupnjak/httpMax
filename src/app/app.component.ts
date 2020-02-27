import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './post.service';
import { error } from 'util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post [] = [];
  isFetchin = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMesage => {
      this.error = errorMesage;
    });
    this.isFetchin = true;
    this.postService.fetchPosts().subscribe(post => {
      this.isFetchin = false;
      this.loadedPosts = post;
   }, error => {
      this.error = error.message;
   }
   );
  }

  onCreatePost(postData: Post) {
    this.postService.creatAndStorePost(postData.title, postData.content);
    this.onFetchPosts();
  }

  onFetchPosts() {
    this.isFetchin = true;
    this.postService.fetchPosts().subscribe(post => {
      this.isFetchin = false;
      this.loadedPosts = post;
   }, error => {
      this.error = error.message;
   });
  }


  onClearPosts() {
   this.postService.deletePosts().subscribe(() => {
     this.loadedPosts = [];
   });
  }

  obrisiZapis(id: string) {
    this.postService.deleteJedanPosts(id);
  }

    ngOnDestroy() {
      this.errorSub.unsubscribe();
    }

}
