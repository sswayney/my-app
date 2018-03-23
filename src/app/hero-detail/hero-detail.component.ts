import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';
import { Hero } from "../hero";

// The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
// This component is interested in the route's bag of parameters extracted from the URL.
// The "id" parameter is the id of the hero to display.

// The location is an Angular service for interacting with the browser.
// You'll use it later to navigate back to the view that navigated here.

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // The HeroDetailComponent template binds to the component's hero property which is of type Hero.
  // The hero property must be an Input property, annotated with the @Input() decorator, because the external HeroesComponent will bind to it
  @Input() hero: Hero;

  // INJECTION!!!
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
  }

  private getHero(): void {
    // the + will cast the string to a number
    const id = +this.route.snapshot.paramMap.get('id');

    // with hero bing what we get, hero is such that this.hero equals what we get: hero. I think.
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    // with location we can control the url
    this.location.back();
  }
}
