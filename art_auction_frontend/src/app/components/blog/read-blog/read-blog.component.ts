import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPayload } from 'src/app/_model/blog_payload';
import { Comment } from 'src/app/_model/comment';
import { BlogService } from 'src/app/_services/blog.service';
import { PostCommentsService } from 'src/app/_services/post-comments.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.css']
})
export class ReadBlogComponent {
  post!: BlogPayload;
  permaLink!: Number;
  comments: Comment[] = [];
  newComment: string = '';
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(private router: ActivatedRoute, 
              private blogService: BlogService, 
              private postCommentsService: PostCommentsService,
              private storageService: StorageService,
              private route: Router) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.blogService.getPost(this.permaLink).subscribe((data:BlogPayload) => {
      this.post = data;
    
    },(err: any) => {
      console.log('Failure Response');
    })
    
    this.postCommentsService.getPostComments(this.permaLink).subscribe((data)=>{
      this.comments = data;
      console.log(this.comments);

    }, (err:any) => {
      console.log('Failure Response');
    })
    this.loggedIn = this.storageService.isLoggedIn();
  }

  submitComment() {
    const comment = {
      writerName: this.storageService.getUser()!.username as string, 
      content: this.newComment,
      dateCreated: new Date()
    };

    this.comments.push(comment);
    this.newComment = ''; 
  }

  redirectToLogin() {
    this.route.navigate(['/login-signup']); 
  }

  deleteComment(commentId: number) {
    
    this.postCommentsService.deleteComment(commentId).subscribe(
      response => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      error => {
        // Handle error
      }
    );
  }

}
