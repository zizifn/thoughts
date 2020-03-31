import { Injectable } from '@angular/core';

import { Store } from './redux-store';

import { Observable } from 'rxjs';
import { LocalActions, LocalAction } from './action/LocalAction';

export interface SomeModel {
    name: string;
}

export class LocalState {
    someModel: SomeModel[] = [];
}

@Injectable()
export class LocalStore extends Store {
    public state$: Observable<LocalState>;
    constructor() {
        super(new LocalState());
    }

    reducer(state: LocalState, action?: LocalAction) {
        switch (action.type) {
            case LocalActions.ADD:
                return {
                    ...state,
                    someModel: [...state.someModel, action.payload]
                };
            case LocalActions.REPLACE:
                return {
                    ...state,
                    someModel: action.payload
                };
            // case LocalActions.FETCH:
            //     this._fetch$ = this.service.fetchSomeModel().pipe(
            //         map(res => this.actions.emit({
            //             type: LocalActions.REPLACE,
            //             payload: res
            //         }))
            //     ).subscribe();
        }
    }
}
