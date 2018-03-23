import { Injectable } from '@angular/core';// Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator.
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import {MessageService} from "./message.service";

import {HEROES} from "./mock-heroes";
import {Hero} from "./hero";



// The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
@Injectable()
export class HeroService {

  // This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // Todo: send the message AFTER fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message AFTER fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    // with hero as a hero in the heroes list, get a hero such that the hero id is id.
    return of(HEROES.find(hero => hero.id === id));
  }

}
