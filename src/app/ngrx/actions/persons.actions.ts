import {createAction, props} from "@ngrx/store";
import { Person } from "src/app/interfaces/person";

export const personList = createAction(
 '[persons/api] get persons success',
 props<{ persons: ReadonlyArray<Person> }>()
);

