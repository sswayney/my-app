import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../hero";



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // The HeroDetailComponent template binds to the component's hero property which is of type Hero.
  // The hero property must be an Input property, annotated with the @Input() decorator, because the external HeroesComponent will bind to it
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
