import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './pages/intro/intro.component';
import { ReactivFormComponent } from './pages/reactiv-form/reactiv-form.component';
import { ReactiveFormComponent } from './pages/reactive-form/reactive-form.component';
const routes: Routes = [
  {
    path: "",
    redirectTo: "/form",
    pathMatch: 'full'
  },
  {
    path: 'form',
    component: ReactiveFormComponent,
    data: {
      title: 'React Form'
    }
  },
  {
    path: 'intro',
    component: IntroComponent,
    data: {
      title: 'Intro'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
