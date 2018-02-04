import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeHtmlComponent } from './safe-html.component';

describe('SafeHtmlComponent', () => {
  let component: SafeHtmlComponent;
  let fixture: ComponentFixture<SafeHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
