import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin.service';
import { User } from 'src/app/_model/user';
import { Role } from 'src/app/_model/role';


export interface DialogData {
  user: User;
}



@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  form: FormGroup;
  errorMessage: string | undefined;
  roles = [
    {id: 1, name: Role.ROLE_USER},
    {id: 2, name: Role.ROLE_ADMIN}
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private adminService: AdminService) {
      this.form = this.fb.group({
        firstname: [data.user.firstname, Validators.required],
        lastname: [data.user.lastname, Validators.required],
        username: [data.user.username, Validators.required],
        address: [data.user.address, Validators.required],
        roles: [data.user.roles, Validators.required]
      });

      
  }

  ngOnInit() {
  }

  editUser(): void {
    if (this.form.valid) {
      let updatedUser = {...this.data.user, ...this.form.value};
      
      this.adminService.updateUser(updatedUser).subscribe(() => {
        this.dialogRef.close(updatedUser);
      }, err => {
        this.errorMessage = err.status === 409 
          ? "Username should be unique for each user." 
          : "Unexpected error occurred.";
      });
    }
  }

  
}
