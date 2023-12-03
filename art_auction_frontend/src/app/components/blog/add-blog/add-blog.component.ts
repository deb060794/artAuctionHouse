import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogPayload } from 'src/app/_model/blog_payload';
import { BlogService } from 'src/app/_services/blog.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  addBlogForm!: FormGroup;
  blogPayload!: BlogPayload;
  title = new FormControl('');
  body = new FormControl('');

  constructor(private blogService: BlogService, private router: Router, private storageService :StorageService) {
    this.addBlogForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.blogPayload = {
      content: '',
      title: '',
      username:''
      
    }
  }

  ngOnInit() {
  }

  addPost() {
    this.blogPayload.content = this.addBlogForm.get('body')!.value;
    this.blogPayload.title = this.addBlogForm.get('title')!.value;
    this.blogService.addPost(this.blogPayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Failure Response');
    })
  }

}
