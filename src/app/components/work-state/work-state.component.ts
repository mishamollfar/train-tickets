import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cht-work-state',
  templateUrl: './work-state.component.html',
  styleUrls: ['./work-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkStateComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  icon: { name: string; color: string };

  constructor() {}

  ngOnInit() {}
}
