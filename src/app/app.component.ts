import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post [] = [];
  isFetchin = false;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ngOnInit() {
    this.isFetchin = true;
    this.postService.fetchPosts().subscribe(post => {
      this.isFetchin = false;
      this.loadedPosts = post;
   });
  }

  onCreatePost(postData: Post) {
    this.postService.creatAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetchin = true;
    this.postService.fetchPosts().subscribe(post => {
      this.isFetchin = false;
      this.loadedPosts = post;
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


}
