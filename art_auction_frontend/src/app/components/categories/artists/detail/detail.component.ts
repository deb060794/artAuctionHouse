
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from 'src/app/_services/artist.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  artist:any;
  artistId!: number;
  arts:any;
  constructor(private artistService: ArtistService,  
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.artistId = params['id'];
        
        if (this.artistId) {
          this.getArtist(this.artistId);
          
          this.getArt(this.artistId);
        } else {
          console.log('No category id');
        }
      });
    }

  
getArtist(id: number): void {
  this.artistService.getArtistById(id).subscribe({
      next: (data: any) => {
        this.artist = data; 
        console.log(this.artist);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getArt(id:number): void{
    this.artistService.getArtOfArtist(id).subscribe({
        next: (data: any) => {
          this.arts= data;
          
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }

    navigateToArt(id: number) { 
      this.router.navigate(['/bid'], { queryParams: { id: id } });
    }

    addToWishlist(artId: number) {
      
    }

}