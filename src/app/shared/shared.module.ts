import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { ValidatorDirectiveDirective } from './validator-directive.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations : [
        LoadingSpinnerComponent,
        DropdownDirective,
        ValidatorDirectiveDirective
    ],
    imports : [CommonModule],
    exports : [
        LoadingSpinnerComponent,
        DropdownDirective,
        ValidatorDirectiveDirective,
        CommonModule
    ]
})
export class SharedModule{

}