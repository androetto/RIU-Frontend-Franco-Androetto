import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new hero', async () => {
    await service.addHero('Superman');
    expect(service.getHeros().length).toBe(1);
    expect(service.getHeros()[0].name).toBe('Superman');
  });

  it('should delete a hero by id', async () => {
    await service.addHero('Batman');
    const heroId = service.getHeros()[0].id;
    await service.deleteHero(heroId);
    expect(service.getHeros().length).toBe(0);
  });

  it('should edit a hero name', async () => {
    await service.addHero('Flash');
    const heroId = service.getHeros()[0].id;
    await service.editHero(heroId, 'Green Lantern');
    expect(service.getHeros()[0].name).toBe('Green Lantern');
  });

  it('should get a hero by id', async () => {
    await service.addHero('Wonder Woman');
    const heroId = service.getHeros()[0].id;
    const hero = await service.getHeroById(heroId);
    expect(hero).toBeTruthy();
    expect(hero?.name).toBe('Wonder Woman');
  });

  it('should filter heroes by name', async () => {
    await service.addHero('Iron Man');
    await service.addHero('Hulk');
    service.setFilterText('hulk');
    expect(service.getHeros().length).toBe(1);
    expect(service.getHeros()[0].name).toBe('Hulk');
  });

  it('should generate unique IDs', async () => {
    await service.addHero('Thor');
    await service.addHero('Loki');
    const heroes = service.getHeros();
    expect(heroes[0].id).not.toBe(heroes[1].id);
  });
});
