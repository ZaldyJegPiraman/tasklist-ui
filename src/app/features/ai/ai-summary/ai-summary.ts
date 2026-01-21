import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { AiService } from '../../../core/services/ai.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-ai-summary',
  standalone: true,
  imports: [CommonModule, MarkdownModule, MatProgressBarModule],
  templateUrl: './ai-summary.html',
    styleUrls: ['./ai-summary.css']
})
export class AiSummaryComponent implements OnInit {

  summary = '';
  loading = true;

  constructor(
    private aiService: AiService,
    private cdr: ChangeDetectorRef // ✅ IMPORTANT
  ) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.loading = true;

    this.aiService.getTaskSummary().subscribe({
      next: (res) => {
        console.log(res);
        this.summary = res.summary;
        this.loading = false;

        // ✅ FORCE UI UPDATE
        this.cdr.detectChanges();
      },
      error: () => {
        this.summary = 'Unable to load AI summary.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
