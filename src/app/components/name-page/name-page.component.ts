import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cht-name-page',
  templateUrl: './name-page.component.html',
  styleUrls: ['./name-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamePageComponent implements OnInit {
  @Input()
  name: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (!this.name) {
      this.name = this.route.snapshot.data.title;
    }
  }
}
