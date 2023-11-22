import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { user } from 'src/app/models/user.model';
import { PlayersService } from 'src/app/services/players.service';
import { TeamsService } from 'src/app/services/teams.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  teams: any[] = [];
  searchPlayerQuery = '';
  players: any[] = [];
  favoritePlayers: string[] = [];
  favoriteTeams: string[] = [];
  searchQuery = '';
  selectedTeam: HTMLElement | null = null;

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private teamService : TeamsService,
              private playerService : PlayersService) {}

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
    favoriteTeams: [[]],
    favoritePlayers: [[]]
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
      favoriteTeams: this.formulario.controls['favoriteTeams'].value,
      favoritePlayers: this.formulario.controls['favoritePlayers'].value
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

  selectTeam(teamId: number, teamName: string) {
    const currentFavoriteTeams = this.formulario.controls['favoriteTeams'].value as number[];
    const updatedFavoriteTeams = [...currentFavoriteTeams, teamId];

    this.favoriteTeams.push(teamName);
    this.formulario.controls['favoriteTeams'].setValue(updatedFavoriteTeams);
  }

  searchPlayersByName() {
    this.playerService.searchPlayersByName(this.searchPlayerQuery)
    .subscribe((data) => {
      this.players = data;
    },
    (error) => {
      console.log(error);
    })
  }

  selectPlayer(player: any) {
    const currentFavoritePlayers = this.formulario.controls['favoritePlayers'].value as string[];
    const updatedFavoritePlayers = [...currentFavoritePlayers, player.strPlayer];

    this.favoritePlayers = updatedFavoritePlayers;
    this.formulario.controls['favoritePlayers'].setValue(updatedFavoritePlayers);
  }

  changeColorTeam(event: Event) {
    const teamContainer = (event.target as HTMLElement).closest('.team-container');
    if(teamContainer){
      teamContainer.classList.toggle('clicked');
    }
  }

  changeColorPlayer(event: Event) {
    const playerContainer = (event.target as HTMLElement).closest('.player-container');
    if(playerContainer){
      playerContainer.classList.toggle('clicked');
    }
  }

  get passwordMatch(): boolean {
    const password = this.formulario.get('password')?.value;
    const confirmPassword = this.formulario.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

}
