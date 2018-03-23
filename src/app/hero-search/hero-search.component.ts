import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {

  /**
   * Notice the declaration of heroes$ as an Observable
   * You'll set it in ngOnInit(). Before you do, focus on the definition of searchTerms.
   * Remember that this component class does NOT SUBSCRIBE to the heroes$ observable. That's the job of the AsyncPipe in the template.
   * (AsyncPipe in the template)<-heroes$<-searchTerms.pipe(heroService.searchHeroes(term))
   */
  heroes$: Observable<Hero[]>;

  /**
   * The searchTerms property is declared as an RxJS Subject.
   * A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
   * You can also push values into that Observable by calling its next(value) method as the search() method does.
   */
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators
   * that reduce the number of calls to the searchHeroes(), ultimately returning an observable
   * of timely hero search results (each a Hero[]).
   */
  ngOnInit(): void {
    // Remember that the component class does not subscribe to the heroes$ observable. That's the job of the AsyncPipe in the template.
    this.heroes$ = this.searchTerms.pipe(
      // waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string.
      // You'll never make requests more frequently than 300ms.
      debounceTime(300),

      // ignore new term if same as previous term. ensures that a request is sent only if the filter text changed.
      distinctUntilChanged(),

      // switch to new search observable each time the term changes.
      // calls the search service for each search term that makes it through debounce and distinctUntilChanged.
      // It cancels and discards previous search observables, returning only the latest search service observable.
      switchMap((term: string) => this.heroService.searchHeroes(term)) // a little confused here. can term be anyting here?
      // With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call.
      // Even with a 300ms pause between requests, you could have multiple HTTP requests in flight and they may not
      // return in the order sent.
      // switchMap() preserves the original request order while returning only the observable from the most recent HTTP
      // method call. Results from prior calls are canceled and discarded.
      // Note that canceling a previous searchHeroes() Observable doesn't actually abort a pending HTTP request.
      // Unwanted results are simply discarded before they reach your application code.
    );
  }
}

