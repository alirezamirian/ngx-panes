import {Component, Input} from '@angular/core';
import {GithubRepo} from '../github-api-models';

@Component({
  selector: 'app-github-repo-card',
  templateUrl: './github-repo-card.component.html',
  styleUrls: ['./github-repo-card.component.scss']
})
export class GithubRepoCardComponent {

  @Input()
  repo: GithubRepo;

  constructor() {
  }

}
