import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  @Output() dismiss = new EventEmitter();

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.elRef.nativeElement.remove();
  }

  onDismiss() {
    this.dismiss.emit()
  }

}
