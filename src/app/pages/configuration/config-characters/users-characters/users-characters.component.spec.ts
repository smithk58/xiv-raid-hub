import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCharactersComponent } from 'src/app/pages/configuration/config-characters/users-characters/users-characters.component';

describe('UsersCharactersComponent', () => {
  let component: UsersCharactersComponent;
  let fixture: ComponentFixture<UsersCharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCharactersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
