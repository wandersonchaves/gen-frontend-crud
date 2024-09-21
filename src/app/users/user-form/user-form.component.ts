import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  name: string = ''
  email: string = ''

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  createUser() {
    if (this.name && this.email) {
      this.userService.createUser(this.name, this.email).subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: (error) => {
          console.error('Error creating user:', error)
        },
        complete: () => {
          console.log('User creation complete')
        },
      })
    } else {
      console.error('Name and Email are required')
    }
  }
}
