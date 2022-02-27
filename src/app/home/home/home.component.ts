import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
 
  
  constructor(
   
  ) {
   
  }

  ngOnInit() { }
  
  

}
