import { createReducer, on } from "@ngrx/store";
import { Person } from "src/app/interfaces/person";
import {  personList } from "../actions/persons.actions";

export const initalState: ReadonlyArray<Person> = [];

export const personReducer = createReducer(
    initalState,
    on(personList,(state, {persons}) => [ ...state, ...persons])
)
