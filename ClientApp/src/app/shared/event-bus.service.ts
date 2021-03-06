import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventData } from 'src/app/shared/event.class';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject();
  riskData;

  constructor() { }

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
  
  sendMessage(message: string) {
    this.subject$.next({ text: message });
  }

  clearMessage() {
    this.subject$.next();
  }

  getMessage(): Observable<any> {
    return this.subject$.asObservable();
  }

  saveData(data) {
    this.riskData = data;
  }

  getData() {
    return this.riskData;
  }

  
}
