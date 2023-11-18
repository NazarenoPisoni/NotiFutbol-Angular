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

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private route: ActivatedRoute) {}

  formulario: FormGroup = this.fb.group({
    id: 0,
    firstName: '',
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    dni: '',
    email: '',
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d.*\d)[A-Za-z\d]{8,}$/)]],
    confirmPassword: ['', Validators.required]
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
        firstName: [{ value: this.user?.firstName, disabled: false }, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        lastName: [{ value: this.user?.lastName, disabled: false }, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        dni: [{ value: this.user?.dni, disabled: true }],
        email: [{ value: this.user?.email, disabled: true }],
        password: [this.user?.password, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d.*\d)[A-Za-z\d]{8,}$/)]],
        confirmPassword: ['', Validators.required],
        favoriteTeams: this.user?.favoriteTeams 
      })
    })
  }

  editUser() {
    if(this.formulario.invalid || !this.passwordMatch) return;

    const userUpdated : user = {
      id: this.formulario.controls['id'].value,
      firstName: this.formulario.controls['firstName'].value,
      lastName: this.formulario.controls['lastName'].value,
      dni: this.formulario.controls['dni'].value,
      email: this.formulario.controls['email'].value,
      password: this.formulario.controls['password'].value,
      favoriteTeams: this.formulario.controls['favoriteTeams'].value
      
    }
    alert('Data was updated succesfully');
    this.userService.putUser(userUpdated);  
  }

  get passwordMatch(): boolean {
    const password = this.formulario.get('password')?.value;
    const confirmPassword = this.formulario.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

}

