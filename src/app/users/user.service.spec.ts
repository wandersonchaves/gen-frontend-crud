import { Apollo } from 'apollo-angular';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), Apollo, UserService],
    })
    service = TestBed.inject(UserService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
