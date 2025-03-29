import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNewsModalComponent } from './delete-news-modal.component';

describe('DeleteNewsModalComponent', () => {
  let component: DeleteNewsModalComponent;
  let fixture: ComponentFixture<DeleteNewsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteNewsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteNewsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
