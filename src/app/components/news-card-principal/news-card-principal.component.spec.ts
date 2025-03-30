import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardPrincipalComponent } from './news-card-principal.component';

describe('NewsCardPrincipalComponent', () => {
  let component: NewsCardPrincipalComponent;
  let fixture: ComponentFixture<NewsCardPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCardPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
