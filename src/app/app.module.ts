import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './General-Layout/header/header.component'
import { Validator2 } from './shared/validator2';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Validator2,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
