import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../../core/hero/hero.service';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/components/confirm-dialog/confirm-dialog.service';
import { LoadingService } from '../../../shared/services/loading.service';
@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styles: [
    `
      .search-and-button {
        display: flex;
        gap: 16px;
      }

      .search-field {
        flex-grow: 1;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
})
export class HeroListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router = inject(Router);
  heroService = inject(HeroService);
  loadingService = inject(LoadingService);
  confirmDialogService = inject(ConfirmDialogService);

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  searchText: string = '';

  heroes = effect(() => {
    const heroesList = this.heroService.getHeros();
    this.dataSource.data = heroesList;
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  });
  heroesLength = computed(() => this.heroService.getHeros().length);

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.heroService.setFilterText(input.value);
  }

  goToNew(): void {
    this.router.navigate(['new']);
  }

  goToEdit(heroId: any): void {
    this.router.navigate(['update', heroId]);
  }

  goToDelete(heroId: number): void {
    const message = 'Are you sure you want to delete this hero?';

    this.confirmDialogService.openConfirmDialog(message).subscribe((result) => {
      if (result) {
        this.loadingService.startLoading();
        setTimeout(() => {
          this.heroService.deleteHero(heroId);
          this.loadingService.stopLoading();
        }, 2000);
      }
    });
  }
}
