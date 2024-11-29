import { Component, Input, OnInit } from '@angular/core';
import { Evento } from '../../core/modelo/evento';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ficha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ficha.component.html',
  styleUrl: './ficha.component.scss'
})
export class FichaComponent {
  action: any;
  id: any;
  data: any
 constructor(
  public activatedRoute: ActivatedRoute,
  public db: DatabaseService
 ){
  this.id = (this.activatedRoute.snapshot.paramMap.get('id'));
  this.action = (this.activatedRoute.snapshot.paramMap.get('action'));
  this.db.getDocumentById('eventos',this.id)
  .subscribe((res: any)=>{
    console.log('evento seleccionado',res);
    this.data = res;
  });
 }

  
}

