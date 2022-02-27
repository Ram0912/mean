import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { 
    this.userForm = this.formBuilder.group({
      mail: ['', Validators.compose([Validators.required, 
        Validators.pattern("\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$")])],
      password: ['', [Validators.required,
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
      name: ['', Validators.required],
      address: ['',Validators.required],
      phoneNumber: ['',[Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      state:['', Validators.required],
      city:['', Validators.required],    
      role:['', Validators.required],
    })
  }

  ngOnInit() { }
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  onSubmit(): any {
    this.submitted= true;
    if (this.userForm.invalid) {
      return;
    }


    this.crudService.AddUser(this.userForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/user-list'))
      }, (err) => {
        console.log(err);
    });
  }

}
