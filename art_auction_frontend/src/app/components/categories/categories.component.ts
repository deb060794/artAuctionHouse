import { Component, OnInit } from '@angular/core';
import { ArtistCategoryService } from 'src/app/_services/artist-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  
  






  constructor(private artistCategoryService: ArtistCategoryService, private router: Router) { }

  ngOnInit(): void {
    this.artistCategoryService.getAllCategories().subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => {
        console.log(err) 
    }
    });
  }

  navigateToCategoryArtists(categoryId: number) {
    console.log(categoryId);  
    this.router.navigate(['/categories/artists'], { queryParams: { id: categoryId } });
  }



}
