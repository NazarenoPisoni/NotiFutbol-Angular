import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {

  constructor(private userService : UserService,
              private router : Router) {}

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  get user() {
    return this.userService.currentUser;
  }
}
