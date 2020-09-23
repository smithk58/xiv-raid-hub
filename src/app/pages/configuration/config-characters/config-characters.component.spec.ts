import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigCharactersComponent } from './config-characters.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersCharactersComponent } from 'src/app/pages/configuration/config-characters/users-characters/users-characters.component';

describe('ConfigCharactersComponent', () => {
  let component: ConfigCharactersComponent;
  let fixture: ComponentFixture<ConfigCharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ ConfigCharactersComponent, UsersCharactersComponent ]
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
