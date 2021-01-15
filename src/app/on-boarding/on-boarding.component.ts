import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { map, startWith } from 'rxjs/operators';

const steps = ['stepOne', 'stepTwo'];

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html'
})
export class OnBoardingComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isFormValid$: Observable<boolean>;

  constructor(private formsManager: AkitaNgFormsManager<any>) { }

  ngOnInit() {
    const stepsValidity$ = steps.map(step => {
      return this.formsManager
        .selectValid(step)
        .pipe(startWith(false));
    })

    this.isFormValid$ = combineLatest(...stepsValidity$).pipe(
      map((stepsValidity) => stepsValidity.every(Boolean))
    );
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }

  submit() {
    const formValue = steps.reduce((acc, step) => {
      return { ...acc, ...this.formsManager.getForm(step).value };
    }, {});

    console.log('TCL: OnBoardingComponent -> submit -> formValue', formValue);

    
  }
}
