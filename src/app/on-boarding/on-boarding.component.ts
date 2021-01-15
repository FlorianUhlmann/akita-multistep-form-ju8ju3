import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, combineLatest } from "rxjs";
import { AkitaNgFormsManager } from "@datorama/akita-ng-forms-manager";
import { map, startWith, tap } from "rxjs/operators";

const steps = ["stepOne", "stepTwo"];

@Component({
  selector: "app-on-boarding",
  templateUrl: "./on-boarding.component.html"
})
export class OnBoardingComponent implements OnInit, OnDestroy {
  buff : any;
  isAngebotPreis: number = 1;
  form: FormGroup;
  isFormValid$: Observable<boolean>;

  constructor(private formsManager: AkitaNgFormsManager<any>) {}

  ngOnInit() {
    const stepsValidity$ = steps.map(step => {
      {
        console.log(steps.entries);
        return this.formsManager.selectValid(step).pipe(startWith(false));
      }
    });

    this.isFormValid$ = combineLatest(...stepsValidity$).pipe(
      map(stepsValidity => stepsValidity.every(Boolean))
    );

    this.formsManager.upsert('stepTwo', this.form);

  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }

  calculateAngebot(form: FormGroup) {
    console.log(form.value);
    return 10;
  }

  submit() {
    const formValue = steps.reduce((acc, step) => {
      return { ...acc, ...this.formsManager.getForm(step).value };
    }, {});

    console.log("TCL: OnBoardingComponent -> submit -> formValue", formValue);
    console.log(this.formsManager.getForm("stepOne").value);

    this.formsManager.selectForm('stepOne')
     .pipe(
    map(response => response.value),
    tap(users => console.log("users array", users))    // users array [Object, Object, Object]
  ).subscribe(res => this.buff = res);
  }
}
