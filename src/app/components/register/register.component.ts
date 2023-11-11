import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { TeamsService } from 'src/app/services/teams.service';
import { UserService } from 'src/app/services/user.service';

const serverURl = 'http://localhost:3000/users';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  users: user[] = [];
  teams: any[] = [];
  searchQuery = '';
  selectedTeam: HTMLElement | null = null;

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private teamService : TeamsService,
              private renderer: Renderer2,
              private router : Router) {}

  formulario: FormGroup = this.fb.group({
    userId: 0,
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
      userId: this.formulario.controls['userId'].value,
      firstName: this.formulario.controls['firstName'].value,
      lastName: this.formulario.controls['lastName'].value,
      dni: this.formulario.controls['dni'].value,
      email: this.formulario.controls['email'].value,
      password: this.formulario.controls['password'].value,
      favoriteTeamId: this.formulario.controls['favoriteTeamId'].value
      
    }

    /* this.userService.setUser(userRegistered);
    alert('Registration Successful!'); */
    /* aca iria un add product */

    console.log(userRegistered);
    ///aca me muestra el objeto bien tengo problemas al agregarlo
  

    /* this.userService.addUser(userRegistered, serverURl);
    alert('Registration Successful!'); */

    this.userService.addUser(userRegistered, serverURl).subscribe(

      (response) => {
         console.log("usuario registrado bien", response);
      },
      (error) => {
        console.log("erorrrrr")
      }
    )
    
    this.router.navigate(['/user-home', userRegistered.email]);
    
  }

  getUsuarios(){
    return this.userService.getUser();
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
