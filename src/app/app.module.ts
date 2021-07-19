import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CreatedataComponent } from './createdata/createdata.component';
import { HttpClientModule } from '@angular/common/http';
import { BtnComponent } from './btn/btn.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CanvasComponent,
    CreatedataComponent,
    BtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
