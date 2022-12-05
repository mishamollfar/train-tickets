import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AppRoutingService } from '../../core/app-routing.service';

@Component({
  selector: 'cht-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopToolbarComponent implements OnInit {
  @Input() showUserBtn = true;

  constructor(public router: AppRoutingService) {}

  ngOnInit() {}
}
