import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPayload } from 'src/app/_model/blog_payload';
import { BlogService } from 'src/app/_services/blog.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  posts!: Observable<Array<BlogPayload>>;
  totalPosts = 0; 
  currentPage = 1;

  @ViewChild(MatPaginator)paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.posts = this.blogService.getAllPosts();
    this.posts.subscribe((data: any) => {                                                         
      this.totalPosts = data.length;
    });
    console.log(this.posts);
  }



}
