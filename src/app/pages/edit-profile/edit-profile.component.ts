import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {


  profileForm: FormGroup;
  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private fb: FormBuilder
  ) {
    if (auth.profile) {
      this.profileForm = fb.group({
        name: [auth.profile?.email, [Validators.required, Validators.email]],
        description: [auth.profile?.name, Validators.minLength(4)],
        precio: [auth.profile?.phone],
        // portraitPhoto: [auth.profile?.protraitPhoto ],
      })
    }
    else {
      this.profileForm = fb.group({})
    }


  }
  onEdit() {
    if (this.profileForm.valid) {
      console.log('datos por enviar', this.profileForm.value);
      this.db.updateFirestoreDocument('users', this.auth.profile?.id, this.profileForm.value)
    }
    else {
      console.log(this.profileForm)
      alert('Datos incorrectos');
    }
  }

}
