import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TasksModule } from './tasks/tasks.module'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { RepollNotifierService } from './services/repoll-notifier.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TasksModule,
    HttpClientModule
  ],
  providers: [RepollNotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
