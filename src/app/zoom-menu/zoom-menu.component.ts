import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zoom-menu',
  templateUrl: './zoom-menu.component.html',
  styleUrls: ['./zoom-menu.component.scss'],
})
export class ZoomMenuComponent implements OnInit {

  constructor() { }

  zoomFactor = 10;

  ngOnInit() { }

  onChangeZoom(event: any) {
    this.zoomFactor = event.detail.value;
  }

}
