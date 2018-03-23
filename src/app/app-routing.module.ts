// An Angular best practice is to load and configure the router in a separate, top-level module that is dedicated to
// routing and imported by the root AppModule. By convention, the module class name is AppRoutingModule and it belongs
// in the app-routing.module.ts in the src/app folder.

import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

// components that need routing
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

// our routes
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];


// You generally don't declare components in a routing module
// so you can delete the @NgModule.declarations array and delete CommonModule references too.
// note the commented out import above and below
@NgModule({
  imports: [
    // You first must initialize the router and start it listening for browser location changes.
    // Add RouterModule to the @NgModule.imports array and configure it with the routes in
    // one step by calling RouterModule.forRoot() within the imports array, like this:
    RouterModule.forRoot(routes) // also, whats forChild?
    //The method is called forRoot() because you configure the router at the application's root level.
    // The forRoot() method supplies the service providers and directives needed for routing,
    // and performs the initial navigation based on the current browser URL.
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
