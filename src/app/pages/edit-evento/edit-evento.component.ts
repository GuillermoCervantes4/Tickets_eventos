import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-edit-evento',
  standalone: true,
  imports: [],
  templateUrl: './edit-evento.component.html',
  styleUrl: './edit-evento.component.scss'
})
export class EditEventoComponent {
profileForm: FormGroup;
  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private fb: FormBuilder
  ) {
    if (auth.profile) {
      this.profileForm = fb.group({
        email: [auth.profile?.email, [Validators.required, Validators.email]],
        name: [auth.profile?.name, Validators.minLength(4)],
        phone: [auth.profile?.phone],
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
