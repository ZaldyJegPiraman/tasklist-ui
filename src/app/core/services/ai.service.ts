
import { DocumentAiResult } from '../../features/ai/models/document-ai-result.model';



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {

  constructor(private http: HttpClient) {}
  
analyzeDocument(formData: FormData) {
  return this.http.post<DocumentAiResult>(
    '/api/ai/analyze-document',
    formData
  );
}
  // getTaskSummary(): Observable<{ summary: string }> {
  //   return this.http.get<{ summary: string }>(
  //     '/api/ai/task-summary'
  //   );
  // }
getTaskSummary() {
  return this.http.get<{ summary: string }>(
    '/api/ai/task-summary'
  );
}
  
}
