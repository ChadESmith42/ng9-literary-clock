import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public copyrightYear;

  ngOnInit() {
    const now: Date = new Date();
    this.copyrightYear =  now.getFullYear().toString();
  }

}
