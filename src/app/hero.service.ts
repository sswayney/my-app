import { Injectable } from '@angular/core';
import {HEROES} from "./mock-heroes";
import {Hero} from "./hero";
// Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator.

// The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Hero[] {
    return HEROES;
  }

}
