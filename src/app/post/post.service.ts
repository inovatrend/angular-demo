import {Injectable} from '@angular/core';
import {Headers, Http, Response, URLSearchParams} from "@angular/http";
import {environment} from "../../environments/environment";
import {Post} from "./post.model";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class PostService {

  private postListUrl = environment.baseServerUrl + "/post/list";
  private postUploadUrl = environment.baseServerUrl + "/post/save";
  private postDeleteUrl = environment.baseServerUrl + "/post/delete";

  private postList_: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  public postList: Observable<Post[]> = this.postList_.asObservable();

  constructor(private http: Http) {
  }

  savePost(formData: FormData): Observable<Response> {

    let headers = new Headers();
    return this.http.post(this.postUploadUrl, formData, {headers});
  }


  public fetchPosts() {

    console.log("Fetching posts...");
    this.http.get(this.postListUrl)
      .map(resp => {
        console.log("Posts fetched", resp.json());
        return resp.json().content;
      })
      .map(json => json.map(p => Post.fromJson(p)))
      .subscribe(
        postList => this.postList_.next(postList),
        error => console.log("Failed to fetch posts from server", error)
      );
  }


  public deletePost(post: Post): Observable<string> {
    let params = new URLSearchParams();
    params.set("postId", post.id.toString());
    return this.http.get(this.postDeleteUrl, {search: params}).map(resp => resp.text());
  }

}
