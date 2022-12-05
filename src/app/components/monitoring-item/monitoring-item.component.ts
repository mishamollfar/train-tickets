import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActiveCheck, DeleteCheck } from '../../state/check.actions';

@Component({
  selector: 'cht-monitoring-item',
  templateUrl: './monitoring-item.component.html',
  styleUrls: ['./monitoring-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringItemComponent implements OnInit {
  @Input()
  item;

  constructor(private store: Store) {}

  ngOnInit() {}

  deactiv() {
    this.store.dispatch(new ActiveCheck({ update: { active: !this.item.active }, checkId: this.item._id }));
  }

  removeCheck() {
    this.store.dispatch(new DeleteCheck(this.item._id));
  }
}
