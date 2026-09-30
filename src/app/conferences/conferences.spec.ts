import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Conferences } from './conferences';

describe('Conferences', () => {
  let component: Conferences;
  let fixture: ComponentFixture<Conferences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conferences],
    }).compileComponents();

    fixture = TestBed.createComponent(Conferences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
