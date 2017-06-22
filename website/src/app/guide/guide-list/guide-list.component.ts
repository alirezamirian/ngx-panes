import {Component, OnInit} from '@angular/core';
import {GuideService} from '../guide.service';
import {GuideModel} from '../guides';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.scss']
})
export class GuideListComponent implements OnInit {
  private guides: Array<GuideModel>;

  constructor(private service: GuideService) {
  }

  ngOnInit() {
    this.guides = this.service.getAll();
  }

}
