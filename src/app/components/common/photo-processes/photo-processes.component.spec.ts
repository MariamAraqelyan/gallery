import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoProcessesComponent } from './photo-processes.component';

describe('PhotoProcessesComponent', () => {
  let component: PhotoProcessesComponent;
  let fixture: ComponentFixture<PhotoProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoProcessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
