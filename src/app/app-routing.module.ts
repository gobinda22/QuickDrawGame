import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ CanvasComponent } from './canvas/canvas.component';
import { CreatedataComponent } from './createdata/createdata.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: 'canvas', component: CanvasComponent },
  { path: 'createdata', component: CreatedataComponent },
  { path: '', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
