import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UppercaseDirective } from './uppercase.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appUppercase />`
})
class TestComponent {}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UppercaseDirective], 
      declarations: [TestComponent] 
    });
    fixture = TestBed.createComponent(TestComponent);
    inputElement = fixture.debugElement.query(By.directive(UppercaseDirective));
    fixture.detectChanges(); 
  });

  it('should create the directive', () => {
    expect(inputElement).toBeTruthy();
  });

  it('should convert text input to uppercase', () => {
    const input = inputElement.nativeElement as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input')); 
    fixture.detectChanges(); 

    expect(input.value).toBe('TEST');
  });
});
