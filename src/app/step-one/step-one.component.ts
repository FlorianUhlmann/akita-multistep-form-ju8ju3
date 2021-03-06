import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AkitaNgFormsManager } from "@datorama/akita-ng-forms-manager";

@Component({
  selector: "app-step-one",
  templateUrl: "./step-one.component.html"
})
export class StepOneComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private formsManager: AkitaNgFormsManager<any>
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      hausgroesse: ["150", Validators.required],
      housebutton: ["Einfamilienhaus"]
    });

    this.formsManager.upsert("stepOne", this.form);
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }

  sub(val){console.log('focusout in label Hausgröße')}
}
