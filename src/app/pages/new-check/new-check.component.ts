import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { ChecksService } from '../../api';
import { city } from '../../cityUA';
import { CreateCheck, CreateCheckSuccess, UpdateCheck, UpdateCheckSuccess } from '../../state/check.actions';
import { MinDate } from './date-validators';
import { AppRoutingService } from '../../core/app-routing.service';

@Component({
  selector: 'cht-new-check',
  templateUrl: './new-check.component.html',
  styleUrls: ['./new-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCheckComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  searchParameter: FormGroup;
  towns = city;
  filteredCityFrom: Observable<any[]>;
  filteredCityTo: Observable<any[]>;

  createPage = true;

  minDate = new Date();

  defaultValue = {
    from: '',
    to: '',
    dateTrainGo: Date.now(),
    timeFrom: '00:00',
    timeTo: '23:59',
    trainCarriage: {
      lux: true,
      compartment: true,
      berth: true,
      seatingFirstClass: true,
      seatingSecondClass: true,
    },
    placeInCarriage: {
      notShowTopPlace: false,
      notShowBottomPlace: false,
      notShowLateralPlace: false,
      notShowNeatToiletPlace: false,
    },
    placeCount: 1,
    intervalSearch: 1,
  };

  fastSelect = [
    { name: 'Київ', id: 2200001 },
    { name: 'Львів', id: 2218000 },
    { name: 'Одеса', id: 2208001 },
    { name: 'Харків', id: 2204001 },
    { name: 'Дніпро', id: 2210700 },
    { name: 'Зборів', id: 2218141 },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private actions$: Actions,
    private checkService: ChecksService,
    public rout: AppRoutingService,
    private title: Title
  ) {
    this.createPage = this.route.snapshot.routeConfig.path === 'new-check';
    this.initForm(this.defaultValue);
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      this.getMonitoring();
    }
    this.actionDispatched();
  }

  ngOnInit() {
    this.setTitle();

    this.filteredCityFrom = this.searchParameter.get('from').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredCityTo = this.searchParameter.get('to').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  setTitle() {
    if (this.createPage) {
      this.title.setTitle('Railway Ticket / Новий моніторинг');
    } else {
      this.title.setTitle('Railway Ticket / Редагування моніторингу');
    }
  }

  getMonitoring() {
    const selectedCheck = this.store.selectSnapshot(state =>
      state.checks.list.find(item => item._id === this.route.snapshot.params.id)
    );
    if (selectedCheck === undefined) {
      this.checkService
        .getCheckById(this.route.snapshot.params.id)
        .pipe(
          tap(rs => {
            this.prepareValueToForm(rs);
          })
        )
        .subscribe();
    } else {
      this.prepareValueToForm(selectedCheck);
    }
  }

  prepareValueToForm(selectedCheck) {
    const value = selectedCheck;
    value['from'] = selectedCheck.from.name;
    value['to'] = selectedCheck.to.name;
    value['intervalSearch'] =
      selectedCheck.checkInterval > 1 && selectedCheck.checkInterval < 5 ? 3 : selectedCheck.checkInterval;
    this.defaultValue = value;
    // this.initForm(value);
    this.searchParameter.patchValue({ ...value });
  }

  initForm(value) {
    this.searchParameter = new FormGroup({
      from: new FormControl(value.from, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      to: new FormControl(value.to, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      dateTrainGo: new FormControl(value.dateTrainGo, [Validators.required, Validators.maxLength(10), MinDate]),
      timeFrom: new FormControl(value.timeFrom, [Validators.required, Validators.maxLength(5)]),
      timeTo: new FormControl(value.timeTo, [Validators.required, Validators.maxLength(5)]),
      trainCarriage: new FormGroup({
        lux: new FormControl(value.trainCarriage.lux),
        compartment: new FormControl(value.trainCarriage.compartment),
        berth: new FormControl(value.trainCarriage.berth),
        seatingFirstClass: new FormControl(value.trainCarriage.seatingFirstClass),
        seatingSecondClass: new FormControl(value.trainCarriage.seatingSecondClass),
      }),
      placeInCarriage: new FormGroup({
        notShowTopPlace: new FormControl(value.placeInCarriage.notShowTopPlace),
        notShowBottomPlace: new FormControl(value.placeInCarriage.notShowBottomPlace),
        notShowLateralPlace: new FormControl(value.placeInCarriage.notShowLateralPlace),
        notShowNeatToiletPlace: new FormControl(value.placeInCarriage.notShowNeatToiletPlace),
      }),
      placeCount: new FormControl(value.placeCount, [Validators.required, Validators.min(1), Validators.max(10)]),
      intervalSearch: new FormControl(value.intervalSearch, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
    });
    this.searchParameter.patchValue({ dateTrainGo: new Date(value.dateTrainGo + 60000) });
  }

  reverseCity() {
    const selectValue = this.searchParameter.getRawValue();
    this.searchParameter.patchValue({ from: selectValue['to'], to: selectValue.from });
  }

  sendCheckTiket() {
    const valueForm = this.searchParameter.value;
    valueForm['from'] = this._filter(valueForm['from'], true)[0];
    valueForm['to'] = this._filter(valueForm['to'], true)[0];

    valueForm['intervalSearch'] =
      valueForm['intervalSearch'] === 3 ? Math.floor(Math.random() * 5) + 1 : valueForm['intervalSearch'];

    const dat = new Date(valueForm['dateTrainGo']).toString().split('GMT')[0] + 'Z';
    valueForm['dateTrainGo'] = new Date(dat).toISOString().split('T')[0];

    if (this.createPage) {
      this.store.dispatch(new CreateCheck(valueForm));
    } else {
      this.store.dispatch(new UpdateCheck({ update: valueForm, checkId: this.defaultValue['_id'] }));
    }
  }

  private _filter(value: string, one = false): any[] {
    const filterValue = value.toLowerCase();

    if (one) {
      return this.towns.filter(option => option.name.toLowerCase() === filterValue);
    } else {
      return this.towns.filter(option => option.name.toLowerCase().includes(filterValue));
    }
  }

  actionDispatched() {
    this.actions$
      .pipe(
        ofActionDispatched(...[UpdateCheckSuccess, CreateCheckSuccess]),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.router.navigateByUrl('/'));
  }

  getErrorMessage() {
    return this.searchParameter.get('dateTrainGo').hasError('invalidDate') ? 'Вибрана дана, меньша за поточну' : '';
  }

  fastSelectCity(field: string, cityOject: { name: string; id: number }) {
    this.searchParameter.patchValue({ [field]: cityOject.name });
  }
}
