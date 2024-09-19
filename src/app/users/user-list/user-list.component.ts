import {Component, OnInit} from '@angular/core'

import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {User} from '@/types'
import {UserService} from '../user.service'

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = []
  error: string | null = null
  loading = true
  editingUser: User | null = null
  updatedName: string = ''
  updatedEmail: string = ''

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers()
  }

  fetchUsers() {
    this.loading = true
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users
        this.loading = false
      },
      (error) => {
        this.handleError(error)
      },
    )
  }

  removeUser(id: number) {
    this.userService.removeUser(Number(id)).subscribe(
      () => {
        console.log('User removed successfully')
        this.fetchUsers()
      },
      (error) => {
        this.handleError(error)
      },
    )
  }

  startEditing(user: User) {
    this.editingUser = user
    this.updatedName = user.name
    this.updatedEmail = user.email
  }

  updateUser() {
    if (this.editingUser) {
      this.userService
        .updateUser(this.editingUser.id, this.updatedName, this.updatedEmail)
        .subscribe(
          (updatedUser) => {
            if (updatedUser) {
              console.log('User updated successfully')
              this.fetchUsers()
              this.editingUser = null
            }
          },
          (error) => {
            this.handleError(error)
          },
        )
    }
  }

  cancelEdit() {
    this.editingUser = null
  }

  private handleError(error: any) {
    console.error('Error:', error)
    this.error = error.message || 'An error occurred'
    this.loading = false
  }
}
