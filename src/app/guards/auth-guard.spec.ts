import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { AuthService } from '../auth/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: { isLoggedIn: () => true }
        },
        {
          provide: Router,
          useValue: { navigate: () => {} }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

it('should allow access when logged in', () => {
  expect(guard.canActivate()).toBe(true);
});
});
