import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Inject, Component } from '@angular/core';

import { Category } from 'src/app/_model/category';
import { Country } from 'src/app/_model/country';
import { Art } from 'src/app/_model/art';
import { ArtService } from 'src/app/_services/art.service';

import { StorageService } from 'src/app/_services/storage.service';
import { AuctionState } from 'src/app/_model/auctionState';
import { User } from 'src/app/_model/user';
import { Role } from 'src/app/_model/role';



@Component({
  selector: 'app-create-art-dialog',
  templateUrl: './create-art-dialog.component.html',
  styleUrls: ['./create-art-dialog.component.css']
})
export class CreateArtDialogComponent {
  formArt: FormGroup;
  errorMessage: string | undefined;
  countries = Object.values(Country);
  categories = Object.values(Category);
  showAdminBoard = false;
  private roles: string[] = [];
  
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateArtDialogComponent>,
    private artService: ArtService,
    private storageService: StorageService ) {
      
      this.formArt = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        image: [''],
        category: ['', Validators.required],
        initialPrice: ['', Validators.required],
        artist: this.fb.group({  
          id: [null],
          name: [''],
          imageUrl: [''],
          description: [''],
          country: ['']  
        })
});
    }
createArt(): void {
    if (this.formArt.valid) {
      let newArt: Art = this.formArt.value;
      newArt.creationDate = new Date();
      newArt.state = AuctionState.Published;
      newArt.seller = this.storageService.getUser()
      
      this.artService.createArt(newArt).subscribe((createdArt) => {
        this.dialogRef.close(createdArt);
      }, err => {
        this.errorMessage = err.status === 409 
          ? "Art creation was not possible." 
          : "Unexpected error occurred.";
      });
    }

  }

  
}

