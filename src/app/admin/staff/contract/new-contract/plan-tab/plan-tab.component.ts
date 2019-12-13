import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-plan-tab',
  templateUrl: './plan-tab.component.html',
})
export class PlanTabComponent implements OnInit {

  tabs: Array<any> = new Array<any>();
  data: any = {};
  dropdownSettings = {};
  dropdownSettingsPackage;
  posts: Array<any> = new Array<any>();

  constructor (
  ) {
    this.posts = [
      {
        class: 'green',
        date: '20-04-2018 - Today',
        header: 'Hello, \'Im a single div responsive timeline without media Queries!',
        user: 'Elisse Joson',
        location: 'San Francisco, CA',
      },
      {
        class: 'blue',
        date: '19-04-2018 - Yesterday',
        header: 'Oeehhh, that\'s awesome.. Me too!',
        user: 'Katherine Lumaad',
        location: 'Oakland, CA',
      },
      {
        class: 'warning',
        date: '21-02-2018',
        header: 'An Engineer Explains Why You Should Always Order the Larger Pizza',
        user: 'Gary Camara',
        location: 'San Francisco, CA',
      }
    ];

    this.tabs = [
      {
        title: 'Home',
        content: this.posts
      },
      {
        title: 'Profile',
        content: this.posts
      },
      {
        title: 'Contact',
        hideTitle: true,
        content: this.posts
      },
    ];
   }

  ngOnInit() {
  }

  addPlan(title) {
    // this.modalService.open(this.formCretePlan, { size: 'lg' });
  }

  removePlan(index) {}

  removeIncurredItemTable() {}
}
