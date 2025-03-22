import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../../../core/hero/hero.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogService } from '../../../shared/components/confirm-delete-dialog/confirm-delete-dialog.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockHeroService } from '../../../test/mocks/mock-hero.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: HeroService;
  let confirmDialogService: ConfirmDialogService;
  let loadingService: LoadingService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: HeroService, useClass: MockHeroService },
        {
          provide: ConfirmDialogService,
          useValue: jasmine.createSpyObj('ConfirmDialogService', [
            'openConfirmDialog',
          ]),
        },
        {
          provide: LoadingService,
          useValue: jasmine.createSpyObj('LoadingService', [
            'startLoading',
            'stopLoading',
          ]),
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    confirmDialogService = TestBed.inject(ConfirmDialogService);
    loadingService = TestBed.inject(LoadingService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the HeroListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of heroes', fakeAsync(() => {

    tick();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Mock Hero 1');
    expect(rows[1].textContent).toContain('Mock Hero 2');
  }));

  it('should call goToEdit when edit button is clicked', () => {
    spyOn(component, 'goToEdit');
    const editButton =
      fixture.nativeElement.querySelectorAll('mat-icon-button')[0];
    fixture.detectChanges();
    editButton.click();
    expect(component.goToEdit).toHaveBeenCalledWith(1);
  });

  it('should call goToDelete when delete button is clicked', () => {
    spyOn(component, 'goToDelete');
    const deleteButton =
      fixture.nativeElement.querySelectorAll('mat-icon-button')[1];
    deleteButton.click();
    expect(component.goToDelete).toHaveBeenCalledWith(1);
  });

  it('should filter heroes by search text', () => {
    const searchInput = fixture.nativeElement.querySelector('input[matInput]');
    searchInput.value = 'Hero 1';
    searchInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Mock Hero 1');
  });

  it('should navigate to the new hero page when Add Hero button is clicked', () => {
    const addButton = fixture.nativeElement.querySelector('button');
    addButton.click();
    expect(router.navigate).toHaveBeenCalledWith(['new']);
  });
});
