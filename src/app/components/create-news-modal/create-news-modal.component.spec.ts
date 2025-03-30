import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewsModalComponent } from './create-news-modal.component';
import { HttpClientModule } from '@angular/common/http'; 

describe('CreateNewsModalComponent', () => {
  let component: CreateNewsModalComponent;
  let fixture: ComponentFixture<CreateNewsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewsModalComponent, HttpClientModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
