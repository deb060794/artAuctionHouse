import { Component, OnInit } from '@angular/core';
import { ArtService } from 'src/app/_services/art.service';
import { ArtCategoryService } from 'src/app/_services/art-category-service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit{
  arts:any;
  categories:any;
  itemsPerPageOptions: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  itemsPerPage: number = this.itemsPerPageOptions[1];
  currentPage: number = 1; 
  totalItems: number = 0; 
  maxSize: number = 5;
  pagedArts: any[] = [];
  selectedCategory = '';

  
  
  

  constructor(private artService: ArtService,
              private artCategoryService:ArtCategoryService,
              private router: Router){}

  ngOnInit(){
    this.artService.getAllArtWorks().subscribe(
      data => {
        this.arts = data;
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

  addToWishlist(artId: number) {
      
  } 
}
