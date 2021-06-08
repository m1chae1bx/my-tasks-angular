import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartModule } from './sub-modules/start/start.module';

import { AppComponent } from './app.component';

import { NotifierService } from './services/notifier.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StartModule,
  ],
  providers: [NotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
