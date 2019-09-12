import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-res-card',
  templateUrl: './res-card.component.html',
  styleUrls: ['./res-card.component.scss']
})
export class ResCardComponent implements OnInit {

  @Input() restaurant;

  constructor() { }

  ngOnInit() {
  }

}
