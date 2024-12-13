import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Si usas RouterLink y RouterOutlet
import { NgForOf } from '@angular/common';  // Asegúrate de que estas directivas estén incluidas correctamente en CommonModule
import { CardComponent } from './components/card/card.component'; // Si tienes componentes personalizados
import { BtnComponent } from './components/btn/btn.component'; // Lo mismo aquí
import { MessageComponent } from './components/message/message.component';
import { Component, OnInit, inject } from '@angular/core';  // Asegúrate de incluir 'Component' aquí


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  
    RouterModule,   
    CardComponent,  
    BtnComponent,   
    MessageComponent,
   
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMenuOpen = true;

  constructor(){
    console.log('constructor app component');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
