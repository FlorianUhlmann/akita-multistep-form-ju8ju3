import { Directive, Attribute, ElementRef } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { combineLatest } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Directive({
  selector: '[validStep]'
})
export class ValidStepDirective {
  constructor(
    @Attribute('validStep') private step,
    private formsManager: AkitaNgFormsManager<any>,
    private host: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    const step = `step${captiliaze(this.step)}`;
    const isStepValid$ = this.formsManager.selectValid(step);
    const isStepDirty$ = this.formsManager.selectDirty(step);

    combineLatest(isStepDirty$, isStepValid$)
      .pipe(untilDestroyed(this))
      .subscribe(([isDirty, isValid]) => {
        if (isDirty) {
          this.host.nativeElement.classList.toggle('invalid', !isValid);
        }
      });
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }
}

function captiliaze(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
