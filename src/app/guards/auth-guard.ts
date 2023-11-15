import { inject } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { user } from '../models/user.model';

function checkAuthStatus(): boolean | Observable<boolean>{
  const userService = inject(UserService);
  const router = inject(Router);
  const user: user | undefined = userService.currentUser

  return userService.checkStatusAutentication()
                    .pipe(
                      tap( estaAutenticado => {
                        if(!estaAutenticado) router.navigate(['/login'])
                      } )
                    )
}

export const AuthGuard = () => {
  return checkAuthStatus()
}