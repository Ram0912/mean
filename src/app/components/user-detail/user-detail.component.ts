import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {
  submitted = false;
  getId: any;
  updateForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetUser(this.getId).subscribe(res => {
      this.updateForm.setValue({
      
        mail:res['mail'],
        password: res['password'],
      name: res['name'],
      address: res['address'],
      phoneNumber: res['phoneNumber'],
      state:res['state'],
      city:res['city'],
      role: res['role']
      });
    });

    this.updateForm = this.formBuilder.group({
      
      mail:['', Validators.required],
      password:['', Validators.required],
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
    return this.updateForm.controls;
  }
  onUpdate(): any {
    this.submitted= true;
    if (this.updateForm.invalid) {
      return;
    }    this.crudService.updateUser(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/user-list'))
      }, (err) => {
        console.log(err);
    });
  }

}
