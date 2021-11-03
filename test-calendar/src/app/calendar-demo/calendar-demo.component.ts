import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export interface ServiceGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-calendar-demo',
  templateUrl: './calendar-demo.component.html',
  styleUrls: ['./calendar-demo.component.css']
})
export class CalendarDemoComponent implements OnInit {
  selectTime = false;
  day = new Date();
  value = "Clear me";
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg) {
    this.selectTime = true;
    
    this.day = arg.dateStr;
    console.log(this.day);
  }
  
  
  serviceForm: FormGroup = this._formBuilder.group({
    serviceGroup: '',
  });

  serviceGroups: ServiceGroup[] = [{
    letter: 'A',
    names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
  }, {
    letter: 'C',
    names: ['California', 'Colorado', 'Connecticut']
  }, {
    letter: 'D',
    names: ['Delaware']
  }];

  serviceGroupOptions: Observable<ServiceGroup[]>;

  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.serviceGroupOptions = this.serviceForm.get('serviceGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  private _filterGroup(value: string): ServiceGroup[] {
    if (value) {
      return this.serviceGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.serviceGroups;
  }

}
