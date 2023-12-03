import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtService } from 'src/app/_services/art.service';

@Component({
  selector: 'app-won-bid',
  templateUrl: './won-bid.component.html',
  styleUrls: ['./won-bid.component.css']
})
export class WonBidComponent implements OnInit {
  art: any;
  permaLink!: number;

  constructor(private route: ActivatedRoute,
              private artService : ArtService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.artService.getArtById(this.permaLink).subscribe(
      data => { 
        this.art = data;
        console.log(data);
      },
      err => {
        this.art = JSON.parse(err.error).message;
      } 
    );    
    
  }

  addToCart() {
    
    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

    cart.push(this.art);

    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}


