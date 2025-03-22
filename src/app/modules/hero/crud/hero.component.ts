import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeroService } from '../../../core/hero/hero.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { UppercaseDirective } from '../../../shared/directives/uppercase.directive';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    UppercaseDirective
  ]
})
export class HeroComponent implements OnInit {
  heroForm: FormGroup;

  private router = inject(Router);
  private heroService = inject(HeroService);
  loadingService = inject(LoadingService);

  private fb = inject(FormBuilder);

  constructor(
    private _activatedRoute: ActivatedRoute,

  ) {
    this.heroForm = this.fb.group({
      id: [''],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.heroService.getHeroById(Number(id)).then(hero => {
        if (hero) {
          this.heroForm.patchValue({
            id: hero.id,
            name: hero.name
          });
        }
      });
    }
    
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const heroName = this.heroForm.value.name;
      const heroId = this.heroForm.value.id;
      this.loadingService.startLoading(); 
      setTimeout(() => {
        if (heroId) {
          this.heroService.editHero(heroId, heroName);
        } else {
          this.heroService.addHero(heroName);
        }
  
        this.goToList();
        this.loadingService.stopLoading();
      }, 2000);
    }
  }
  
  

  goToList(): void {
    this.router.navigate(['/']);
  }
}
