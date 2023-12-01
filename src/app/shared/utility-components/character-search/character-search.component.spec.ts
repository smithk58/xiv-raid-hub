import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XivapiClientModule, XivapiService } from '@xivapi/angular-client';

import { CharacterSearchComponent } from 'src/app/shared/utility-components/character-search/character-search.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CharacterSearchComponent', () => {
  let component: CharacterSearchComponent;
  let fixture: ComponentFixture<CharacterSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [XivapiClientModule.forRoot(), SharedModule],
      declarations: [ CharacterSearchComponent ],
      providers: [XivapiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
