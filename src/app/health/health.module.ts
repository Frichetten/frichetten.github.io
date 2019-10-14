import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
})
export class HealthComponent {
  constructor() {}
}

@NgModule({
  declarations: [HealthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HealthComponent }
    ])
  ],
})
export class HealthModule {} 