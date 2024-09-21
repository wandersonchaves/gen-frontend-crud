import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { UserFormComponent } from './user-form.component';

class MockUserService {
  createUser(name: string, email: string) {
    return of(null)
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate')
}

describe('UserFormComponent', () => {
  let component: UserFormComponent
  let fixture: ComponentFixture<UserFormComponent>
  let userService: UserService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, ReactiveFormsModule],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: Router, useClass: MockRouter},
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UserFormComponent)
    component = fixture.componentInstance
    userService = TestBed.inject(UserService)
    router = TestBed.inject(Router)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should create a user and navigate', () => {
    component.name = 'Test User'
    component.email = 'test@example.com'
    component.createUser()

    expect(router.navigate).toHaveBeenCalledWith(['/'])
  })

  it('should handle validation error', () => {
    spyOn(console, 'error')
    component.name = ''
    component.email = ''
    component.createUser()

    expect(console.error).toHaveBeenCalledWith('Name and Email are required')
  })
})
