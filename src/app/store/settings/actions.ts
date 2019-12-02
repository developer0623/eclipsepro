import { Action } from '@ngrx/store';
import { ILanguage } from 'app/models/dto';

export const SET_LANGUAGES = '[SET_LANGUAGES]';
export const GET_LANGUAGES = '[GET_LANGUAGES]';

export const GET_FEATURE_FLAGS = '[GET_FEATURE_FLAGS]';
export const SET_FEATURE_FLAGS = '[SET_FEATURE_FLAGS]';
export const POST_FEATURE_FLAG = '[POST_FEATURE_FLAG]';

export class SetLanguagesAction {
  readonly type = SET_LANGUAGES;
  constructor(
        public payload: ILanguage[]
  ) { }
}

export class GetLanguagesAction {
  readonly type = GET_LANGUAGES;
}

export class GetFeatureFlagsAction {
  readonly type = GET_FEATURE_FLAGS;
}

export class SetFeatureFalgsAction {
  readonly type = SET_FEATURE_FLAGS;
  constructor(
        public payload: object
  ) { }
}

export class PostFeatureFalgAction {
  readonly type = POST_FEATURE_FLAG;
  constructor(
        public payload: {feature: string, enabled: boolean}
  ) { }
}
