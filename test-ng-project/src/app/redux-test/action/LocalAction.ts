import { SomeModel } from '../local-store';

export enum LocalActions {
    ADD = '[SomeModel] Add',
    REPLACE = '[SomeModel] Replace',
    FETCH = '[SomeModel] Fetch'
    }

export interface LocalAction {
    type: string;
    payload?: SomeModel[];
    }