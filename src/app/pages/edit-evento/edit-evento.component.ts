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
  styleUrls: ['./edit-evento.component.scss']
})
export class EditEventoComponent {
  eventoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private db: DatabaseService
  ) {
    // Verificamos si hay datos de evento en el servicio AuthService
    const evento = this.auth.evento || {};
    this.eventoForm = this.fb.group({
      id: [evento.id || null], // Opcional: solo si no lo maneja el backend
      nombre: [evento.nombre || '', [Validators.required, Validators.minLength(4)]],
      descripcion: [evento.descripcion || '', [Validators.required]],
      precio: [evento.precio || 0, [Validators.required, Validators.min(0)]],
      descuento: [evento.descuento || 0, [Validators.min(0), Validators.max(100)]],
      destacado: [evento.destacado || false] // Checkbox
    });

    console.log('Formulario de evento inicializado:', this.eventoForm.value);
  }

  // Función para editar evento
  onEdit(): void {
    if (this.eventoForm.valid) {
      // Si el formulario es válido, se imprime el valor y actualiza en Firestore
      console.log('Datos enviados:', this.eventoForm.value);
      this.db.updateFirestoreDocument('eventos', this.eventoForm.value.id, this.eventoForm.value);
    } else {
      // Si el formulario no es válido, se muestra un mensaje de error
      console.log('Formulario inválido', this.eventoForm);
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
