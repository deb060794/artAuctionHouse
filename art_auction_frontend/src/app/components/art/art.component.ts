import { Component, OnInit } from '@angular/core';
import { ArtService } from 'src/app/_services/art.service';
import { ArtCategoryService } from 'src/app/_services/art-category-service';
import { Router } from '@angular/router';
import { Art } from 'src/app/_model/art';
import { Country } from 'src/app/_model/country';
import { Category } from 'src/app/_model/category';
import { Artist } from 'src/app/_model/artist';




@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit{
  arts:any;
  categories:any;
  itemsPerPageOptions: number[] = [4, 8, 12, 16, 20];
  itemsPerPage: number = this.itemsPerPageOptions[1];
  currentPage: number = 1; 
  totalItems: number = 0; 
  maxSize: number = 4;
  pagedArts: any[] = [];
  filteredArts: Art[] | undefined;

  // Filter criteria
  selectedCategory: number | undefined;
  selectedArtist: number | undefined;
  selectedCountry: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
 
  artists: Artist[] = [];   
  countries:Country[] = [];  

  
  
  

  constructor(private artService: ArtService,
              private artCategoryService:ArtCategoryService,
              private router: Router){}

  ngOnInit(){
    this.artService.getAllArtWorks().subscribe(
      data => {
        this.arts = data;
        this.filteredArts = this.arts;
        this.totalItems = this.arts.length;
      },
      err => {
        this.arts = JSON.parse(err.error).message;
      }
    );
 

    this.artCategoryService.getAllCategories().subscribe(
      data => {
        this.categories= data;
      },
      err => {
        this.arts = JSON.parse(err.error).message;
      }
    );
  }

  calculateDaysRemaining(end: string): number {
    const endDate = this.parseEndDate(end);
    const now = new Date();
    const diffInTime = endDate.getTime() - now.getTime(); 
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); 

    return diffInDays;
  }

  parseEndDate(endDate: string):Date{
    return new Date(endDate);
  }

  placeBid(artId: number) {
  }
  makeOffer(artId: number) {
  }

  getEndIndex(): number {
    return this.itemsPerPage;
  }

  initializeComponent() {
    
    this.totalItems = this.arts.length;
    
    this.updatePagedArts();
  }

  updatePagedArts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedArts = this.arts.slice(startIndex, endIndex);
  }

  
  onItemsPerPageChange() {
  
    this.updatePagedArts();
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    console.log(this.currentPage);
  }

  onCategoryChange(id:any) {
    // TODO: Implement your filtering logic here, using this.selectedCategory
  }

  navigateToArt(id: number) { 
    this.router.navigate(['/bid'], { queryParams: { id: id } });
  }

  applyFilters() {
    this.filteredArts = this.arts.filter((art: { categoryId: number; artistId: number; artistCountry: string; initialPrice: number; }) => {
      return (!this.selectedCategory || art.categoryId === this.selectedCategory) &&
             (!this.selectedArtist || art.artistId === this.selectedArtist) &&
             (!this.selectedCountry || art.artistCountry === this.selectedCountry) &&
             (!this.minPrice || art.initialPrice >= this.minPrice) &&
             (!this.maxPrice || art.initialPrice <= this.maxPrice);
    });
  }

  addToWishlist(artId: number) {
      
  } 
}
