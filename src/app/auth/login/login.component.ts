import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  form!: FormGroup;
  error = '';
  loading = false;

  /** 🔥 DOM refs for autofill fix */
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /** 🔥 HARD FIX: sync Chrome autofill → Angular form */
  ngAfterViewInit(): void {
    setTimeout(() => {
      const email = this.emailInput?.nativeElement.value;
      const password = this.passwordInput?.nativeElement.value;

      if (email || password) {
        this.form.patchValue({ email, password });
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      }
    }, 300);
  }

submit(): void {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.error = '';
  this.loading = true;

  this.auth.login(this.form.value).subscribe({
    next: () => {
      this.loading = false;
      this.router.navigate(['/tasks']);
    },
    error: (err) => {
      this.loading = false;

      // ✅ SHOW ERROR MESSAGE
      this.error =
        err?.status === 401
          ? 'Invalid email or password'
          : 'Login failed. Please try again.';

      // ✅ FORCE UI UPDATE
      this.cdr.detectChanges();
    }
  });
}

}
