import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BlogPayload } from 'src/app/_model/blog_payload';
import { BlogService } from 'src/app/_services/blog.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.css']
})
export class UserArticlesComponent {
  posts!: Observable<Array<BlogPayload>>;
  totalPosts = 0; 
  currentPage = 1;

  @ViewChild(MatPaginator)paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  constructor(private blogService: BlogService,
              private storageService : StorageService) { }

  ngOnInit() {
    this.posts = this.blogService.getMyPosts(this.storageService.getUser().id);
    this.posts.subscribe((data: any) => {                                                         
      this.totalPosts = data.length;
    });
    console.log(this.posts);
  }

}
