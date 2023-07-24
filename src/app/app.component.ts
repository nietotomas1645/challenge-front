import { Component, OnInit,ViewChild } from '@angular/core';
import { PersonService } from './services/person.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PersonAddComponent } from './components/person-add/person-add.component';
import { MatDialog } from '@angular/material/dialog';
import { selectPersons } from './ngrx/selectors/person.selector';
import { Store } from '@ngrx/store';
import { personList } from './ngrx/actions/persons.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  characters$ = this.store.select(selectPersons);

  basicData: any;

  basicOptions: any;

  displayedColumns: string[] = [
    'id',
    'name',
    'lastName', 
    'age', 
    'city',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _perService: PersonService, private _dialog:MatDialog, private store: Store){

  }

  ngOnInit(): void {
    this.getPersonList()
    this._perService.getPersonList()
    .subscribe(persons => this.store.dispatch(personList({persons})))


    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Sales',
                data: [540, 325, 702, 620],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                borderWidth: 1
            }
        ]
    };

    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
  }


  openAddForm(){
    const dialogRef = this._dialog.open(PersonAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPersonList();
        }
      },
    });


    
  }


  openEditForm(data: any){
    const dialogRef = this._dialog.open(PersonAddComponent,{
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if (val) {
          this.getPersonList();
        }
      },
    });
  }

  getPersonList(){
    this._perService.getPersonList().subscribe({
      next: (res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deletePerson(id: number){
    this._perService.deletePerson(id).subscribe({
      next: (res) => {
        alert(' Person deleted success! ');
        this.getPersonList();
      },
      error: console.log,
    });
  }

// ngrx

persons$ = this.store.select(selectPersons);

}

