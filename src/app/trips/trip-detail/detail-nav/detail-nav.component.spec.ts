import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNavComponent } from './detail-nav.component';

describe('DetailNavComponent', () => {
  let component: DetailNavComponent;
  let fixture: ComponentFixture<DetailNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
