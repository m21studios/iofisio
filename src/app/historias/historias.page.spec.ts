import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoriasPage } from './historias.page';

describe('HistoriasPage', () => {
  let component: HistoriasPage;
  let fixture: ComponentFixture<HistoriasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
