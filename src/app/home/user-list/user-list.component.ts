import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  
  users:any = [];

  constructor(private crudService: CrudService) {
    // this.users = crudService.users
   }

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe(
      res => {
      console.log(res)
      this.users =res;
    });    
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteUser(id).subscribe((res) => {
        this.users.splice(i, 1);
      })
    }
  }

}