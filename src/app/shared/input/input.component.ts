import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() inputType: string;
  @Input() control: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  get input() {
    return this.control.errors;
  }

}
