import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html'
})
export class AlertMessageComponent implements OnInit {

  @Input() options: any = {};

  public showElement: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleElement(){
    this.showElement = !this.showElement;
  }

}
