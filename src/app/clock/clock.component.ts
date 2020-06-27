import { Component, OnInit } from '@angular/core';
import { Quotes } from '../quotes_full';
import { BehaviorSubject } from 'rxjs';
import { Quote } from './quote';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  public time: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public milTime: BehaviorSubject<string> = new BehaviorSubject<string>('00:00');
  public quote: Quote;
  private quotes: Quote[] = Quotes as Quote[];

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.SetMilTime(this.SetTime());
      this.quote = this.GetQuote();
    }, 1000);
  }

  /**
   * Provides the current time formatted for the application by emitting a new behavior subject value each time it is called.
   * @returns Date
   */
  private SetTime(): Date {
    const now = new Date();
    let h: number = now.getHours();
    const m: number = now.getMinutes();
    const i: string = now.getHours() > 11 ? 'PM' : 'AM';
    if (this.AdjustTime24to12(h)) {
      h = h - 12;
    }
    this.time.next(`${h}:${this.Padding(m)} ${i}`);
    return now;
  }

  /**
   * Modifies the current time to compare with the time in the quote dataset by
   * emitting a new behavior subject value each time it is called.
   * @param now Current time. Will be transformed to 24-hr clock format (HH:MM)
   */
  private SetMilTime(now: Date): void {
    const h: number = now.getHours();
    const m: number = now.getMinutes();
    this.milTime.next(`${this.Padding(h)}:${this.Padding(m)}`);
  }

  /**
   * Filters the dataset for the corresponding quote to the current time.
   * @returns [Quote](literary-clock\src\app\clock\quote.ts)
   */
  private GetQuote(): Quote {
    return this.quotes.filter(q => q.time === this.milTime.value)[0];
  }

  /**
   * Pads single digit values with a leading zero.
   * @param time Current hours or minutes as a number
   */
  private Padding(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
  }

  /**
   * Evaluates current hours for conversion to 12HR clock.
   * @param hours Current hours as a number
   * @returns boolean
   */
  private AdjustTime24to12(hours: number): boolean {
    return hours > 12 ? true : false;
  }

}
