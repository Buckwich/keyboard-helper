import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyboardLayoutRendererComponent } from './keyboard-layout-renderer.component';

describe('KeyboardLayoutRendererComponent', () => {
  let component: KeyboardLayoutRendererComponent;
  let fixture: ComponentFixture<KeyboardLayoutRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardLayoutRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyboardLayoutRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
