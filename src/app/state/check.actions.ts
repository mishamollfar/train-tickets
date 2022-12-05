import { HttpErrorResponse } from '@angular/common/http';
import { CreateCheckDto } from '../api/model/createCheckDto';

export class LoadChecks {
  static readonly type = '[ChecksState] LoadChecks';
}

export class LoadChecksSuccess {
  static readonly type = '[ChecksState] LoadChecksSuccess';
  constructor(public payload: any) {}
}

export class CreateCheck {
  static readonly type = '[ChecksState] CreateCheck';
  constructor(public payload: CreateCheckDto) {}
}

export class CreateCheckSuccess {
  static readonly type = '[ChecksState] CreateCheckSuccess';
  constructor(public payload: string) {}
}

export class UpdateCheck {
  static readonly type = '[ChecksState] UpdateCheck';
  constructor(public payload: { update: CreateCheckDto; checkId: string }) {}
}

export class UpdateCheckSuccess {
  static readonly type = '[ChecksState] UpdateCheckSuccess';
  constructor(public payload: string) {}
}

export class ActiveCheck {
  static readonly type = '[ChecksState] ActiveCheck';
  constructor(public payload: { update: { active: boolean }; checkId: string }) {}
}

export class ActiveCheckSuccess {
  static readonly type = '[ChecksState] ActiveCheckSuccess';
  constructor(public payload: string) {}
}

export class DeleteCheck {
  static readonly type = '[ChecksState] DeleteCheck';
  constructor(public payload: string) {}
}

export class DeleteCheckSuccess {
  static readonly type = '[ChecksState] DeleteCheckSuccess';
  constructor(public payload: string) {}
}

export class Error {
  static readonly type = '[ChecksState] Error';
  constructor(public payload: HttpErrorResponse) {}
}
