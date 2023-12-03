import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_model/user';
import { AdminService } from 'src/app/_services/admin.service';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-deactivate-dialog',
  templateUrl: './deactivate-dialog.component.html',
  styleUrls: ['./deactivate-dialog.component.css']
})
export class DeactivateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeactivateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private adminService: AdminService) {}

    blockUser(): void {
      this.adminService.deactivateUser(this.data.user.id).subscribe(() => {
        this.dialogRef.close(true);
      }, err => {
        console.error('Unexpected error occurred:', err);
        this.dialogRef.close(false);
      });
    }


}
