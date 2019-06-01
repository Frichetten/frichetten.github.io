import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
})
export class NotFoundComponent {
  constructor() {}
}

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: NotFoundComponent }
    ])
  ],
})
export class NotFoundModule {}