import { DialogRef } from '@angular/cdk/dialog';
import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonService } from 'src/app/services/person.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css'],
  providers: [MessageService]
})

export class PersonAddComponent implements OnInit {
  perForm: FormGroup;

  constructor(private _fb: FormBuilder, private _perService: PersonService, private _dialogRef: DialogRef<PersonAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private messageService: MessageService){
    this.perForm = this._fb.group({
      name: ['',Validators.required],
      lastName: ['',Validators.required],
      age:['',Validators.required],
      city:['',Validators.required]
    })
  };

  ngOnInit(): void {
    this.perForm.patchValue(this.data)
  }

  formSubmit(){
    if(this.perForm.valid){
      if(this.data){
        this._perService.updatePerson(this.data.id, this.perForm.value).subscribe({
          next: (val:any) =>{
            alert(' Person update success ');          
            this._dialogRef.close();
            this._perService.getPersonList();           
          },
          error: (err:any)=>{
            console.error(err);
          },
        });
      } else{
        this._perService.addPerson(this.perForm.value).subscribe({
          next: (val:any) =>{            
            this._dialogRef.close();
            this._perService.getPersonList();
            this.showSuccess();
          },
          error: (err:any)=>{
            console.error(err);
          },
        });
      }
    }
  }

  closeForm(){
    this._dialogRef.close();
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}




}
