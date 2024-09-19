import {Component} from '@angular/core'

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {}
// export class UserListComponent implements OnInit {
//   users: any[] = []

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.fetchUsers()
//   }

//   fetchUsers() {
//     this.userService.getUsers().subscribe((result) => {
//       this.users = result.data.users
//     })
//   }

//   deleteUser(id: number) {
//     this.userService.removeUser(id).subscribe(() => {
//       this.fetchUsers()
//     })
//   }
// }
