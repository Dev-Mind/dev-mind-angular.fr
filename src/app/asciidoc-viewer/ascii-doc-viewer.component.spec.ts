import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsciiDocViewerComponent } from './ascii-doc-viewer.component';

describe('BlogDetailComponent', () => {
  let component: AsciiDocViewerComponent;
  let fixture: ComponentFixture<AsciiDocViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsciiDocViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsciiDocViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
