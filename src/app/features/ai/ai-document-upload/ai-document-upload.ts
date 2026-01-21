import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AiService } from '../../../core/services/ai.service';
import { TaskService } from '../../../tasks/task.service'; // ✅ ADD
import { DocumentAiResult } from '../models/document-ai-result.model';
import { ExtractedTask } from '../models/extracted-task.model';

@Component({
  selector: 'app-ai-document-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './ai-document-upload.html',
   styleUrls: ['./ai-document-upload.css']
})
export class AiDocumentUploadComponent {

  selectedFile!: File;
  result!: DocumentAiResult;
  loading = false;

  constructor(
    private aiService: AiService,
    private taskService: TaskService,          // ✅ ADD
    private cdr: ChangeDetectorRef              // ❗ DO NOT REMOVE
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  upload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.loading = true;
    this.result = undefined as any;

    this.aiService.analyzeDocument(formData).subscribe({
      next: res => {
        console.log('AI RESULT', res);
        this.result = res;
        this.loading = false;

        // ❗ KEEP THIS
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Analysis failed');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ✅ ADD TASK FUNCTIONALITY (NEW)
  addTask(task: ExtractedTask) {

    const peopleText = task.people?.length
      ? `\n\nPeople mentioned:\n- ${task.people.join('\n- ')}`
      : '';

    const description =
      (task.description ?? '') + peopleText;

    this.taskService.create({
      title: task.title,
      description,
      dueDate: task.dueDate
    }).subscribe({
      next: () => alert(`Task "${task.title}" added successfully`),
      error: () => alert('Failed to create task')
    });
  }
}
