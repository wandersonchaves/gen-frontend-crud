import {Component} from '@angular/core'

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {}
// export class UserFormComponent {
//   name: string = ''
//   email: string = ''

//   constructor(
//     private userService: UserService,
//     private router: Router,
//   ) {}

//   createUser() {
//     this.userService.createUser(this.name, this.email).subscribe(() => {
//       this.router.navigate(['/'])
//     })
//   }
// }
