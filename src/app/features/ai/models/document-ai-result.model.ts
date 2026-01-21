import { ExtractedTask } from './extracted-task.model';

export interface DocumentAiResult {
  summary: string;
  tasks: ExtractedTask[];
}

export interface AiTaskItem {
  title: string;
  dueDate?: string;
}

