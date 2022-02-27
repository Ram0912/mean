import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CrudService } from 'src/app/service/crud.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor( private authService:AuthService, private router: Router, private formBuilder: FormBuilder, private rest: CrudService) {
    console.log("construtor call")
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,
        Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      password: ['', [Validators.required]]
        //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
  });
  }

  isSubmitted  =  false;

  ngOnInit()
  {

}
login(){
  console.log(this.loginForm.value);
  this.isSubmitted = true;
  if(this.loginForm.invalid){
    return;
  }
   this.authService.login(this.loginForm.value).then((res: any) => {
     if(res.success){
       this.router.navigateByUrl('/home/user-list');
      //  this.rest.users = res.users;
     }
    else
    alert("User Invalid")
   });
  
}
get formControls() { return this.loginForm.controls; }
}

// export class InputClearableExample {
//   value = 'Clear me';
// }
