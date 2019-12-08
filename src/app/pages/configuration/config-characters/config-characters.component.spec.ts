import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCharactersComponent } from './config-characters.component';

describe('ConfigCharactersComponent', () => {
  let component: ConfigCharactersComponent;
  let fixture: ComponentFixture<ConfigCharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigCharactersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
