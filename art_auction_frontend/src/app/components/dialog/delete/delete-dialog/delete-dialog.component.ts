import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_model/user';
import { AdminService } from 'src/app/_services/admin.service';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private adminService: AdminService) {}

    deleteUser(): void {
      this.adminService.deleteUser(this.data.user.id).subscribe(() => {
        this.dialogRef.close(true);
      }, err => {
        console.error('Unexpected error occurred:', err);
        this.dialogRef.close(false);
      });
    }

}
