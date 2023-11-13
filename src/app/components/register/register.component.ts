import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { TeamsService } from 'src/app/services/teams.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  teams: any[] = [];
  searchQuery = '';
  selectedTeam: HTMLElement | null = null;

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private teamService : TeamsService,
              private router : Router) {}

  formulario: FormGroup = this.fb.group({
    id: this.userService.getNextId(),
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dni: ['', Validators.minLength(8)],
    email: ['', Validators.required],
    password: ['', Validators.required],
    favoriteTeamId: 0
  })

  saveUser() {
    if(this.formulario.invalid) return;

    const userRegistered : user = {
      id: this.formulario.controls['id'].value, 
      firstName: this.formulario.controls['firstName'].value,
      lastName: this.formulario.controls['lastName'].value,
      dni: this.formulario.controls['dni'].value,
      email: this.formulario.controls['email'].value,
      password: this.formulario.controls['password'].value,
      favoriteTeamId: this.formulario.controls['favoriteTeamId'].value
      
    }
    alert('Registration Successful!');
    this.userService.postUser(userRegistered);        
  }

  searchTeamsByName() {
    this.teamService.getTeamsByName(this.searchQuery)
    .then((data) => {
      this.teams = data.response;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  selectTeam(teamId: number) {
    this.formulario.controls['favoriteTeamId'].setValue(teamId);
  }

  changeColor(event: Event) {
    const teamContainer = (event.target as HTMLElement).closest('.team-container');
    if(teamContainer){
      teamContainer.classList.toggle('clicked');
    }
  }

}
