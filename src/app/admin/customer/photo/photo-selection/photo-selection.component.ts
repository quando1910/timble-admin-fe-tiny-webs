import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-photo-selection',
  templateUrl: './photo-selection.component.html',
})
export class PhotoSelectionComponent implements OnInit, AfterViewInit {

  active = false;

  constructor() { }

  ngOnInit() {
  }

  toggle(val) {
    if (val) {
      this.active = true;
    } else {
      console.log(val, this.active);
      this.active = !this.active;
    }
  }

  ngAfterViewInit() {
    window.addEventListener('click', (e: any) => {
      if (!document.getElementById('picture-manager').contains(e.target)) {
        this.active = false;
      }
    });
  }

  submitPhoto() {
    
  }

}
