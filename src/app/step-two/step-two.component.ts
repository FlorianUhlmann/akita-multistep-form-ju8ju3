import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html'
})
export class StepTwoComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private formsManager: AkitaNgFormsManager<any>
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      street: ['', Validators.required],

    });

    this.formsManager.upsert('stepTwo', this.form);
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }
}
