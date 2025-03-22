import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { HeroService } from '../../../core/hero/hero.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UppercaseDirective } from '../../../shared/directives/uppercase.directive';
import { MockHeroService } from '../../../test/mocks/mock-hero.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;
  let heroService: HeroService;
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        UppercaseDirective,
        HeroComponent,
      ],
      providers: [
        { provide: HeroService, useClass: MockHeroService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: of({ get: () => '1' }) } },
        },
        LoadingService,
      ],
    });

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    loadingService = TestBed.inject(LoadingService);
  });

  it('should create the hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a hero', () => {
    const heroName = 'New Hero';
    component.heroForm.controls['name'].setValue(heroName);
    component.onSubmit();

    const heroes = heroService.getHeroes();
    expect(heroes.length).toBe(3);
    expect(heroes[3].name).toBe(heroName);
  });

  it('should edit a hero', () => {
    const heroId = 2;
    const newHeroName = 'Updated Hero';
    component.heroForm.controls['name'].setValue(newHeroName);
    component.onSubmit();

    const heroes = heroService.getHeroes();
    const updatedHero = heroes.find(hero => hero.id === heroId);
    expect(updatedHero?.name).toBe(newHeroName);
  });

  it('should delete a hero', () => {
    const heroId = 1;
    heroService.deleteHero(heroId);

    const heroes = heroService.getHeroes();
    expect(heroes.find(hero => hero.id === heroId)).toBeUndefined();
  });

  it('should get hero by id', async () => {
    const heroId = 1;
    const hero = await heroService.getHeroById(heroId);
    expect(hero?.name).toBe('Mock Hero 1');
  });
});
