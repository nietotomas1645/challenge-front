import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http: HttpClient) { }

  addPerson (data:any): Observable<Person[]>{
    return this._http.post<Person[]>('https://localhost:7063/api/Persona',data)
  }

  getPersonList(): Observable<Person[]>{
    return this._http.get<Person[]>('https://localhost:7063/api/Persona')
  }

  deletePerson(id: number): Observable<Person[]> {
    return this._http.delete<Person[]>(`https://localhost:7063/api/Persona/${id}`);
  }

  updatePerson (id: number,data:any): Observable<Person[]>{
    return this._http.put<Person[]>(`https://localhost:7063/api/Persona/${id}`,data)
  }
} 
