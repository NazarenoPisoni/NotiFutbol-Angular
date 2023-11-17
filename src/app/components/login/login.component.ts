import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';

  constructor(private fb : FormBuilder,
              private userService : UserService) {}

  formulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  }) 
  
  autenticateUser() {
    if(this.formulario.invalid) return;

    this.userService.verifyUserAndPass(
      this.formulario.controls['email'].value,
      this.formulario.controls['password'].value
    )

    if(!this.userService.currentUser) {
      this.errorMessage = 'Email o contraseña inválidos';
    }
  }
}
