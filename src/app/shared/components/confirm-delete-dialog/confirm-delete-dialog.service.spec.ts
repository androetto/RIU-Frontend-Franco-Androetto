import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-delete-dialog.component';
import { of } from 'rxjs';
import { ConfirmDialogService } from './confirm-delete-dialog.service';

describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ConfirmDialogService,
        { provide: MatDialog, useValue: dialogMock },
      ],
    });

    service = TestBed.inject(ConfirmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dialog and return true when confirmed', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(true));

    dialogMock.open.and.returnValue(dialogRefMock);

    service.openConfirmDialog('Are you sure?').subscribe((result: any) => {
      expect(result).toBe(true);
    });

    expect(dialogMock.open).toHaveBeenCalledWith(
      ConfirmDialogComponent,
      jasmine.any(Object)
    );
  });

  it('should open dialog and return false when canceled', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(false));

    dialogMock.open.and.returnValue(dialogRefMock);

    service.openConfirmDialog('Are you sure?').subscribe((result: any) => {
      expect(result).toBe(false);
    });
  });
});
