import { TestBed } from '@angular/core/testing';
import { TickerComponent } from './ticker.component';

describe('TickerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickerComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TickerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TickerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, boersenticker-frontend');
  });
});
