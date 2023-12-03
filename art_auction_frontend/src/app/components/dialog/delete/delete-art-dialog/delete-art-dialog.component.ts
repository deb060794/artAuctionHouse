import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Art } from 'src/app/_model/art';
import { AdminService } from 'src/app/_services/admin.service';

export interface DialogData {
  art: Art
}

@Component({
  selector: 'app-delete-art-dialog',
  templateUrl: './delete-art-dialog.component.html',
  styleUrls: ['./delete-art-dialog.component.css']
})
export class DeleteArtDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteArtDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private adminService: AdminService) {}

    deleteArt(): void {
      
      this.adminService.deleteArt(this.data.art.id).subscribe(() => {
        this.dialogRef.close(true);
      }, err => {
        console.error('Unexpected error occurred:', err);
        this.dialogRef.close(false);
      });
    }

}


