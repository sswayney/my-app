import { Injectable } from '@angular/core';// Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator.
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from "./message.service";

import { Hero } from "./hero";

/**
 * The heroes web API expects a special header in HTTP save requests. That header is in the httpOptions constant defined in the HeroService.
 * @type {{headers: HttpHeaders}}
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


// The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

  // This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(private http: HttpClient, private messageService: MessageService) { }

  // get them heroes from our server
  getHeroes(): Observable<Hero[]> {
    /**
     * All HttpClient methods return an RxJS Observable of something.
     HTTP is a request/response protocol. You make a request, it returns a single response.
     In general, an Observable can return multiple values over time. An Observable from HttpClient always emits a single value and then completes, never to emit again.
     This particular HttpClient.get call returns an Observable<Hero[]>, literally "an observable of hero arrays". In practice, it will only return a single hero array.
     */
    return this.http.get<Hero[]>(this.heroesUrl) // Applying the optional type specifier, <Hero[]> , gives you a typed result object.
        .pipe(
          tap(heroes => this.log(`fetched heroes`)), // tap operator, which looks at the observable values, does something with those values, and passes them along. The tap call back doesn't touch the values themselves.
          catchError(this.handleError('getHeroes',[]))
        );
    /**
     * Other APIs may bury the data that you want within an object. You might have to dig that data out by processing the Observable result with the RxJS map operator.
     * For example, I think our API returns our lists wrapped in another object with paging info and the list its self is in a data property.
     * Maybe we make our own type for such a thing? Like a ListResponse type.
     */
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /**
   * Interesting. The | is an or pram. then the body of the function checks what type the param is. Cool!
   * Super helpful, ive had cases in the passed where I just passed the id and later I wiched it was the whole object
   * this way you have both.
   * @param {Hero | number} hero
   * @returns {Observable<Hero>}
   */
  deleteHero (hero: Hero | number): Observable<Hero> {
    // If the passed in hero is a number then leave it, if its a Hero then get its id.
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()){return of([]);} // don't forget of!

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching ${term}`)), // why the _ and not (term : string) like addHero? Cause Hero is not a native type? That's my guess.
      catchError(this.handleError<Hero[]>('searchHeros', []))
    );

  }

  /** Log a HeroService message with the MessageService */
  private log(message: string): void {
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed, hmm.. looks like we can have default param values
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    // Because each service method returns a different kind of Observable result, errorHandler() takes a type parameter
    // so it can return the safe value as the type that the app expects.
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
