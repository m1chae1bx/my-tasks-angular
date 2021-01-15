import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TasksModule } from './tasks/tasks.module'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';

import { RepollNotifierService } from './services/repoll-notifier.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TasksModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [RepollNotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
