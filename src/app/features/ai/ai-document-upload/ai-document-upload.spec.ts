import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiDocumentUpload } from './ai-document-upload';

describe('AiDocumentUpload', () => {
  let component: AiDocumentUpload;
  let fixture: ComponentFixture<AiDocumentUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiDocumentUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiDocumentUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
