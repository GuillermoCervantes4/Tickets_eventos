import { Component, OnInit } from '@angular/core';
import { Evento } from '../../core/modelo/evento';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      id: [''],
      nombre: [''],
      descripcion: [''],
      precio: [''],
      descuento:['']
    });
  }

  
  onSubmit(): void {
    const evento: Evento = this.eventForm.value;
    
    // Llamada a la función 'addFirestoreDocument' que ya está en tu servicio
    this.databaseService.addFirestoreDocument('eventos', evento).then(
      (response) => {
        console.log('Evento guardado correctamente:', response);
        alert('Se acaba de agrear el evento');
        this.eventForm.reset();
      },
      (error: any) => {  
        console.error('Error al guardar el evento:', error);
      }
    );
  }
}
