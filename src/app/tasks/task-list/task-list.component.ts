import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { TaskService } from '../task.service';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  ErrorStateMatcher
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

/* =====================================================
   🔥 MATERIAL ERROR FIX
   Show error ONLY when user touches or edits the field
   ===================================================== */
export class TouchOnlyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty)
    );
  }
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskListComponent implements OnInit {

  /* ===============================
     STATE
     =============================== */

  tasks$!: Observable<any[]>;
  form!: FormGroup;

  isEditMode = false;
  editingTaskId: number | null = null;

  /** 🔥 Angular Material error matcher */
  matcher = new TouchOnlyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private service: TaskService
  ) {}

  /* ===============================
     INIT
     =============================== */

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [null],
      priority: [2, Validators.required],
      category: [''],
      status: [1, Validators.required]
    });

    this.load();
  }

  /* ===============================
     LOAD TASKS
     =============================== */

  load(): void {
    this.tasks$ = this.service.getTasks().pipe(
      map(tasks =>
        tasks.map(task => ({
          ...task,
          // normalize backend date → Date object
          dueDate: task.dueDate ? new Date(task.dueDate) : null
        }))
      )
    );
  }

  /* ===============================
     CREATE / UPDATE
     =============================== */

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const d: Date | null = this.form.value.dueDate;

    // ✅ send DATE ONLY (no timezone bug)
    const payload = {
      ...this.form.value,
      dueDate: d
        ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        : null
    };

    const request$ =
      this.isEditMode && this.editingTaskId
        ? this.service.update(this.editingTaskId, payload)
        : this.service.create(payload);

    request$.subscribe(() => {
      this.resetForm();
      this.load();
    });
  }

  /* ===============================
     EDIT
     =============================== */

  edit(task: any): void {
    this.isEditMode = true;
    this.editingTaskId = task.id;

    this.form.patchValue({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      category: task.category,
      status: task.status
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  /* ===============================
     RESET FORM (NO RED BORDERS)
     =============================== */

  resetForm(): void {
    this.form.reset({
      title: '',
      description: '',
      dueDate: null,
      priority: 2,
      category: '',
      status: 1
    });

    // 🔥 Clear validation state completely
    this.form.markAsPristine();
    this.form.markAsUntouched();

    this.isEditMode = false;
    this.editingTaskId = null;
  }

  /* ===============================
     DELETE
     =============================== */

  remove(id: number): void {
    this.service.delete(id).subscribe(() => this.load());
  }

  trackById(_: number, item: any): number {
    return item.id;
  }

  /* ===============================
     LABEL HELPERS
     =============================== */

  getPriorityLabel(p: number): string {
    return p === 1 ? 'Low' : p === 2 ? 'Medium' : 'High';
  }

  getStatusLabel(s: number): string {
    return s === 1 ? 'To Do' : s === 2 ? 'In Progress' : 'Completed';
  }
}
