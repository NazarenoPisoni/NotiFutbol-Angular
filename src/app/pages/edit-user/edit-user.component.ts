import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  user: user | undefined;
  searchQuery = '';
  teams: any[] = [];

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private route: ActivatedRoute) {}

  formulario: FormGroup = this.fb.group({
    id: 0,
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dni: ['', Validators.minLength(8)],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit() {
    this.showUser();
  }

  async showUser() {
    this.route.params.subscribe(async param => {
      const id = +param['id'];
      this.user = await this.userService.getUser(id);
      this.formulario = this.fb.group({
        id: this.user?.id,
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        dni: this.user?.dni,
        email: this.user?.email,
        password: this.user?.password,
        favoriteTeamId: this.user?.favoriteTeamId
      })
    })
  }

  editUser() {
    if(this.formulario.invalid) return;

    const userUpdated : user = {
      id: this.formulario.controls['id'].value, 
      firstName: this.formulario.controls['firstName'].value,
      lastName: this.formulario.controls['lastName'].value,
      dni: this.formulario.controls['dni'].value,
      email: this.formulario.controls['email'].value,
      password: this.formulario.controls['password'].value,
      favoriteTeamId: this.formulario.controls['favoriteTeamId'].value
      
    }
    alert('Data was updated succesfully');
    this.userService.putUser(userUpdated);  
  }

}

