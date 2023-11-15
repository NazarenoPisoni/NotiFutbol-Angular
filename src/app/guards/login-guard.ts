import { inject } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { UserService } from '../services/user.service';

function checkAuthStatus(): boolean | Observable<boolean>{
  const userService = inject(UserService);
  const  router = inject(Router);
  return userService.checkStatusAutentication()
                    .pipe(
                      tap( estaAutenticado => {
                        if(estaAutenticado){
                          router.navigate(['/user-home'])

                        }
                      }),
                      map(estaAutenticado => !estaAutenticado)
                    )
}

export const LoginGuard = () => {
  return checkAuthStatus()
}