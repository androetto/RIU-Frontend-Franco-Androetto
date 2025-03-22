import { Hero } from "../../core/hero/hero.types";

export class MockHeroService {

  private heroes: Hero[] = [
    { id: 1, name: 'Mock Hero 1' },
    { id: 2, name: 'Mock Hero 2' },
  ];

  getHeroes = () => {
    return this.heroes;
  };

  addHero(heroName: string) {
    const newHero = { id: this.generateUniqueId(), name: heroName };
    this.heroes.push(newHero);
  }
  
  editHero(heroId: number, heroName: string) {
    const hero = this.heroes.find(h => h.id === heroId);
    if (hero) hero.name = heroName;
  }

  deleteHero(heroId: number) {
    this.heroes = this.heroes.filter(hero => hero.id !== heroId);
  }

  async getHeroById(heroId: number) {
    return this.heroes.find(hero => hero.id === heroId) || null;
  }

  private generateUniqueId(): number {
    const existingIds = this.heroes.map(hero => hero.id);
    if(existingIds.length === 0) return 1;
    const maxId = Math.max(...existingIds);
    return maxId + 1;
  }
}
