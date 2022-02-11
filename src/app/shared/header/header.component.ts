import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  public user?: User;

  constructor(private authService: AuthService) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
  }

  firstName() { 
    return this.authService.user?.firstName;
  }

  completeCurrentUserName(): string {
    return this.authService.completeCurrentUserName();
  }


  logout() {
    this.authService.logout();
  }
}
