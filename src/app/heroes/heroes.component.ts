import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes'

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

  heroes = HEROES;
  selectedHero: Hero;

  constructor() { }

  //The ngOnInit is a lifecycle hook Angular calls ngOnInit shortly after creating a component. It's a good place to put initialization logic.
  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
