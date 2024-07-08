import { createAction, props } from "@ngrx/store";

export const spinnerAction = createAction('[spinner] spinnerAction', props<{status: boolean}>());