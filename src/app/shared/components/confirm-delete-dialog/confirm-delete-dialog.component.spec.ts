import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-delete-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent, MatDialogModule, MatButtonModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ConfirmDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the passed message', () => {
    component.data = { message: 'Are you sure?' }
    fixture.detectChanges();
    const messageElement = fixture.nativeElement.querySelector('.message');
    expect(messageElement.textContent).toBe('Are you sure?');
  });

  it('should call dialogRef.close(true) when onConfirm is called', () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should call dialogRef.close(false) when onCancel is called', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should have the correct buttons in the dialog', () => {
    const cancelButton: DebugElement = fixture.debugElement.query(By.css('button[mat-button]:first-child'));
    const confirmButton: DebugElement = fixture.debugElement.query(By.css('button[mat-button]:last-child'));
    
    expect(cancelButton.nativeElement.textContent).toBe('Cancel');
    expect(confirmButton.nativeElement.textContent).toBe('Delete');
  });
});
