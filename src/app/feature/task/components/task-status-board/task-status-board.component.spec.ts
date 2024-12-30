import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusBoardComponent } from './task-status-board.component';

describe('TaskStatusBoardComponent', () => {
  let component: TaskStatusBoardComponent;
  let fixture: ComponentFixture<TaskStatusBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskStatusBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
