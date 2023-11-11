import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent {

  userRegistered: user | null = null;

  constructor(private userService : UserService,
              private route : ActivatedRoute) {}

  ngOnInit() {
    const userEmail = this.route.snapshot.paramMap.get('email');

    /* if (userEmail !== null) {
      this.userRegistered = this.userService.getUser(userEmail);
    }
   
     */

    if (this.userRegistered) {
      console.log(this.userRegistered);
    }
  }            
}
