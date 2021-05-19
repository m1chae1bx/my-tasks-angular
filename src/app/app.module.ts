import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyTasksModule } from './my-tasks/my-tasks.module'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NotifierService } from './services/notifier.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyTasksModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [NotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
