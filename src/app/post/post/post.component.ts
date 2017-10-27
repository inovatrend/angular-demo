import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../post.model";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  @ViewChild('fileInput')
  private fileInput;

  private editPostForm: FormGroup;

  public posts: Post[] = [];

  constructor(private postService: PostService, formBuilder: FormBuilder) {

    this.editPostForm = formBuilder.group({
      'text': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'image': null
    });
  }

  ngOnInit() {
    this.postService.postList.subscribe(posts => this.posts = posts);
    this.postService.fetchPosts();
  }


  public onSubmit() {

    if (this.editPostForm.valid) {

      let fileElement = this.fileInput.nativeElement;
      if (fileElement.files && fileElement.files[0]) {
        const formData = new FormData();
        formData.append("text", this.editPostForm.get("text").value);
        formData.append("image", fileElement.files[0]);
        this.postService.savePost(formData).subscribe(
          resp => {
            console.log("Post submit response:", resp);
            this.postService.fetchPosts();
          },
          error => console.log("Post submit failed:", error)
        );
      }
    }
    else console.log("Invalid input");

    return false;
  }

  public getImageUrl(post: Post) {
    return environment.baseServerUrl + "/post/image/" + post.id;
  }

  public deletePost(post: Post) {

    this.postService.deletePost(post).subscribe(
      result => {
        let success = (result.toLowerCase().trim() == 'true');
        if (success) {
          this.postService.fetchPosts();
          console.log("Post deleted successfully");
        }
      },
      error => {
        console.log("Failed to delete post", error);
      }
    );

    return false;
  }
}
