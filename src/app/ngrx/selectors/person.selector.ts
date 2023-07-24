import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Person } from "src/app/interfaces/person";

export const selectPersons = createFeatureSelector<ReadonlyArray<Person>>('persons');