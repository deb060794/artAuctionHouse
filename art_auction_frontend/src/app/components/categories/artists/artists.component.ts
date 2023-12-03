import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistCategoryService } from 'src/app/_services/artist-category.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit{
  artists: any;
  categoryId!: number;
  sortedArtists: any[] = [];
  selectedFilter: string | null = null;
  alphabetLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(private artistCategoryService: ArtistCategoryService,  
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['id'];
                  
      if (this.categoryId) {
        this.artistsByCategory(this.categoryId);
      } else {
        console.log('No category id');
      }
  });
}

            
artistsByCategory(id: number): void {
  this.artistCategoryService.getArtistsByCategory(id).subscribe({
    next: data => {
            this.artists = data;
            this.sortArtistsByName();
            
    },
    error: err => {
      console.log(err);
    }
});
}



  sortArtistsByName(): void {
    this.sortedArtists = [...this.artists].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  navigateToArtist(id: number) { 
    this.router.navigate(['/categories/artists/detail'], { queryParams: { id: id } });
  }

  applyFilter(letter: string): void {
    this.selectedFilter = letter;
  }

 
  get filteredArtists(): any[] {
    if (this.selectedFilter) {
     return this.artists.filter((artist: { name: { startsWith: (arg0: string | null) => any; }; }) => artist.name.startsWith(this.selectedFilter));
  } else {
    return this.artists;
  }
}
  
}

