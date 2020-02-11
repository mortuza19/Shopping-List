import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
    declarations:[AuthComponent],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([{path: '', component:AuthComponent}])
    ],
    providers: [{
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptorService,
        multi : true
      }]
})

export class AuthModule{}