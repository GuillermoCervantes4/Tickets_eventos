import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-evento.component.html',
  styleUrl: './edit-evento.component.scss'
})
export class EditEventoComponent {
  eventoForm: FormGroup;

  constructor(
    public auth: AuthService,
    public db: DatabaseService,
    private fb: FormBuilder
  ) {
    const evento = this.auth.evento || {};
    this.eventoForm = fb.group({
      id: [evento.id || null], // Opcional: solo si no lo maneja el backend
      nombre: [evento.nombre || '', [Validators.required, Validators.minLength(4)]],
      descripcion: [evento.descripcion || '', [Validators.required]],
      precio: [evento.precio || 0, [Validators.required, Validators.min(0)]],
      descuento: [evento.descuento || 0, [Validators.min(0), Validators.max(100)]],
      destacado: [evento.destacado || false], // Checkbox o similar
    });
  }

  onEdit() {
    if (this.eventoForm.valid) {
      console.log('Datos enviados:', this.eventoForm.value);
      this.db.updateFirestoreDocument('eventos', this.eventoForm.value.id, this.eventoForm.value);
    } else {
      console.log('Formulario inválido', this.eventoForm);
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
