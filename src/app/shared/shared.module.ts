import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelComponent } from './model/model.component';



@NgModule({
  declarations: [InputComponent, ModelComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InputComponent, ModelComponent]
})
export class SharedModule { }
