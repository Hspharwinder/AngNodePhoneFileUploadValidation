import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',  redirectTo: '/home',  pathMatch: 'full' },  
  { path: 'home', component: HomeComponent,  }, 
  { path: 'app',  component: AppComponent }, 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const nav = [
                    HomeComponent,
                    AppComponent,
                    PageNotFoundComponent
                  ];
