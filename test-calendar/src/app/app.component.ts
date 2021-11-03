import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { DateClickArg } from '@fullcalendar/interaction';
import { SERVICE_LIST, TIME_LIST } from './service-list';
import { FormControl } from '@angular/forms';


export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-calendar';
  selectTime = false;
  day = new Date();
  startTime = '';
  endTime = '';
  value = "Clear me";
  dayClickedEl:DateClickArg;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ],
    headerToolbar: {
      start: '',
      center: 'prev,title,next',
      end: ''
    },
    footerToolbar: false,
    views: {
      timeGridFourDay: {
        type: 'timeGrid',
        duration: { days: 0 },
        buttonText: '4 day'
      }
    },
    dayHeaders: true
  };
  changeSelectedCellStyle (color, opacity) {
    this.dayClickedEl.dayEl.style.backgroundColor = color;
    this.dayClickedEl.dayEl.style.opacity = opacity;
  }

  handleDateClick(arg) {
    this.selectTime = true;
    
    if(this.dayClickedEl) this.changeSelectedCellStyle("#FFF", 1);
    this.dayClickedEl = arg;
    this.day = arg.dateStr;
    this.changeSelectedCellStyle("#BCC6FF", 0.6);
  }

  handleCloseTimeSlotCard() {
    this.selectTime = false;
    this.changeSelectedCellStyle("#FFF", 1);
  }
  handleCreateSlotCard(startTime, endTime) {
    this.selectTime = false;
    this.startTime = startTime;
    this.endTime = endTime;
    let s = "Doctor Jake " + this.startTime +"-"+this.endTime;
    this.calendarOptions.events = [{title: s , date: this.day}]
    alert("Slot Created for " + this.day + " " + startTime + "-" + endTime)
    this.changeSelectedCellStyle("#FFF", 1);
  }
  searchControl: FormControl;
  startTimeControl: FormControl;
  endTimeControl: FormControl;
  filteredResults$: Observable<string[]>;
  filteredTime$: Observable<string[]>;
  
  results = SERVICE_LIST;
  timelist = TIME_LIST;
  
  
  constructor(private route: ActivatedRoute) {
    this.searchControl = new FormControl('');
    this.startTimeControl = new FormControl('');
    this.endTimeControl = new FormControl('');
    this.filteredResults$ = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filterResults(val)),
      map(val => val.slice(0, 4))
    );
    this.filteredTime$ = this.endTimeControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filterTime(val)),
      map(val => val.slice(0, 4))
    );
  }

  ngOnInit() {}

  private filterResults(val: string): string[] {
    return val ? this.results.filter(v => v.toLowerCase().indexOf(val.toLowerCase()) === 0) : this.results;
  }
  private filterTime(val: string): string[] {
    return val ? this.timelist.filter(v => v.toLowerCase().indexOf(val.toLowerCase()) === 0) : this.timelist;
  }
}
