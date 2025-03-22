import { computed, Injectable, signal } from '@angular/core';
import { Hero } from './hero.types';

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesSignal = signal<Hero[]>([]);
  private searchText = signal<string>('');

  private generateUniqueId(): number {
    const existingIds = this.heroesSignal().map((hero) => hero.id);
    if(existingIds.length === 0) return 1;
    const maxId = Math.max(...existingIds);
    return (maxId + 1);
  }

  public getHeroes = computed(() => {
    const filter = this.searchText().trim().toLowerCase();
    return this.heroesSignal().filter(hero =>
      hero.name.toLowerCase().includes(filter)
    );
  });

  setFilterText(text: string) {
    this.searchText.set(text);
  }

  addHero(heroName: string) {
    const newHero = {
      name: heroName,
      id: this.generateUniqueId(),
    };
    this.heroesSignal.update(hero => ([...hero, newHero]));
  }

  deleteHero(heroId: number) {
    this.heroesSignal.update(heroes => heroes.filter(hero =>
      hero.id !== heroId));
  }

  editHero(heroId: number, heroName: string) {
    const updatedHeroes = this.heroesSignal().map(hero =>
      hero.id === heroId ? { ...hero, name: heroName } : hero
    );
    this.heroesSignal.set(updatedHeroes);
  }

  async getHeroById(heroId: number) {
    const hero = this.heroesSignal().find(hero => hero.id === heroId);
    return hero;
  }

}
