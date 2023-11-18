import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
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
              private teamService : TeamsService) {}

  formulario: FormGroup = this.fb.group({
    id: this.userService.getNextId(),
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    dni: ['', {
      validators: [Validators.minLength(8), Validators.pattern(/^[0-9]+$/)],
      asyncValidators: [this.dniOrEmailValidator('dni')],
      updateOn: 'blur'
    }],
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.dniOrEmailValidator('email')],
      updateOn: 'blur'
    }],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d.*\d)[A-Za-z\d]{8,}$/)]],
    confirmPassword: ['', Validators.required],
    favoriteTeamId: 0
  })

  

  saveUser() {
    if(this.formulario.invalid || !this.passwordMatch) return;

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

  dniOrEmailValidator(fieldName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.checkIfDniOrEmailExists(control.value, fieldName)
        .pipe(
          map(res => (res ? {exists: true} : null)),
          catchError(() => of(null))
        );
    }
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

  get passwordMatch(): boolean {
    const password = this.formulario.get('password')?.value;
    const confirmPassword = this.formulario.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

}
