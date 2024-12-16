import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Giftcard } from '../../core/modelo/giftcard';

@Component({
  selector: 'app-giftcard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './giftcard.component.html',
  styleUrl: './giftcard.component.scss'
})
export class GiftcardComponent implements OnInit {

  cardForm!: FormGroup;
  cards: Giftcard[] = [];

  constructor(private fb: FormBuilder, private databaseService: DatabaseService){}

  ngOnInit(): void{
    this.cardForm = this.fb.group({
      codigo: [''],
      monto: [''],
      caducidad: ['']
    })
    
    this.getCards();
  }

  onSubmit(): void{
    const card: Giftcard = this.cardForm.value;

    this.databaseService.addFirestoreDocument('giftcards', card).then(
      (response) => {
        console.log('Giftcard guardado correctamente:', response);
        alert('Se acaba de agrear el giftcard');
        this.cardForm.reset();
      },
      (error: any) => {  
        console.error('Error al guardar el giftcard:', error);
      }
    );
  }

  getCards(): void {
      this.databaseService.fetchLocalCollection('date').subscribe({
        next: (dato: Giftcard[]) => {
          this.cards =dato;
          console.log('Giftcards cargados:', this.cards)
          this.databaseService.fetchLocalCollection('date')
            .subscribe((res: any) => {
              res.forEach((item: any) => {
                this.databaseService.addFirestoreDocument('giftcards', item);
              });
            });
        },
        error: (e: any) => {
          console.error('Error al cargar giftcards:', e);
        }
      });
    }

  
  trackByCode(index: number, item: Giftcard): any {
      return item.codigo;
    }
}
