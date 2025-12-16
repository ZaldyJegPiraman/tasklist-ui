import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule, // ✅ REQUIRED
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

goToLogin(): void {
  this.router.navigate(['/login']);
}

  submit(): void {
    // ✅ FORCE validation messages immediately
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.success = '';
    this.loading = true;

    const { email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.auth.register({ email, password }).subscribe({
      next: () => {
        this.success = 'Account created successfully. Redirecting to login...';
        this.loading = false;
        this.cdr.detectChanges();

        // ✅ DELAY redirect so success message is visible
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 7500);
      },
      error: (err) => {
        this.error = err.error || 'Registration failed';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
