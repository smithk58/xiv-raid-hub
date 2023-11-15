import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FFService {
  private getClasses$: Observable<string[]>;
  constructor(private http: HttpClient) { }
  /**
   * Returns a list of the available classes in FF14.
   */
  getClasses() {
    if (!this.getClasses$) {
      this.getClasses$ = this.http.get<string[]>('/ff/classes').pipe(
        shareReplay()
      );
    }
    return this.getClasses$;
  }
}
