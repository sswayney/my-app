import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from "../hero.service";


//You always import the Component symbol from the Angular core library and annotate the component class with @Component.
//@Component is a decorator function that specifies the Angular metadata for the component.

//The CSS element selector, 'app-heroes', matches the name of the HTML element that identifies this component within a parent component's template.
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //Always export the component class so you can import it elsewhere ... like in the AppModule.

  heroes: Hero[];

  // Sweet Sweet Injection happens in the constructor
  // Add a private heroService parameter of type HeroService to the constructor.
  // The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  constructor(private heroService: HeroService) {
    // Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
    // The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.
  }

  //The ngOnInit is a lifecycle hook Angular calls ngOnInit shortly after creating a component. It's a good place to put initialization logic.
  ngOnInit() {
    // While you could call getHeroes() in the constructor, that's not the best practice.
    // let Angular call ngOnInit at an appropriate time after constructing a HeroesComponent instance.
    this.getHeroes();
  }


  // before observable
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  getHeroes(): void {
    // waits for the Observable to emit the array of heroes— which could happen now or several minutes from now.
    // Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string) {
    name = name.trim();//no extra white space
    if(!name){return;} //no nulls
    this.heroService.addHero({ name } as Hero).subscribe(hero => {this.heroes.push(hero);});
  }

  delete(hero: Hero): void {
    // remove the hero from our current hero list
    this.heroes = this.heroes.filter(x => x !== hero);
    this.heroService.deleteHero(hero).subscribe(); // shouldn't we remove from our list after successful delete?
    // If you neglect to subscribe(), the service will not send the delete request to the server!
    // As a rule, an Observable does nothing until something subscribes!.. like youtube "stars".. wacka wacka
  }


}
