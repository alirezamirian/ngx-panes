import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GithubRelease} from '../github-api-models';
import Label = GithubRelease.Label;

@Component({
  selector: 'app-github-label',
  templateUrl: './github-label.component.html',
  styleUrls: ['./github-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubLabelComponent {

  @Input()
  label: Label;

  constructor() {
  }

}
