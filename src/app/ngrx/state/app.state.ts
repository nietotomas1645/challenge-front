import { Person } from "src/app/interfaces/person";

export interface AppState {
    persons: ReadonlyArray<Person>
}