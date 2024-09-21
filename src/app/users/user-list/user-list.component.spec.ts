import { of, throwError } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { UserListComponent } from './user-list.component';

class MockUserService {
  getUsers = jasmine.createSpy('getUsers').and.returnValue(of([]))
  removeUser = jasmine.createSpy('removeUser').and.returnValue(of(null))
  updateUser = jasmine.createSpy('updateUser').and.returnValue(of(null))
}

class MockRouter {
  navigate = jasmine.createSpy('navigate')
}

describe('UserListComponent', () => {
  let component: UserListComponent
  let fixture: ComponentFixture<UserListComponent>
  let userService: UserService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, CommonModule, ReactiveFormsModule],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: Router, useClass: MockRouter},
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UserListComponent)
    component = fixture.componentInstance
    userService = TestBed.inject(UserService)
    router = TestBed.inject(Router)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch users on init', () => {
    component.ngOnInit()
    expect(userService.getUsers).toHaveBeenCalled()
  })

  it('should handle fetch error', () => {
    ;(userService.getUsers as jasmine.Spy).and.returnValue(
      throwError({message: 'Error fetching users'}),
    )

    component.fetchUsers()

    expect(component.error).toBe('Error fetching users')
  })

  it('should remove a user', () => {
    component.removeUser(1)
    expect(userService.removeUser).toHaveBeenCalledWith(1)
  })

  it('should start editing a user', () => {
    const user = {id: 1, name: 'Test User', email: 'test@example.com'}
    component.startEditing(user)
    expect(component.editingUser).toEqual(user)
  })

  it('should cancel edit', () => {
    component.editingUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    }
    component.cancelEdit()
    expect(component.editingUser).toBeNull()
  })
})
