import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as _moment from 'moment';


const moment = _moment;

@Component({
  selector: 'app-detail-date',
  templateUrl: './detail-date.component.html',
  styleUrls: ['./detail-date.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DetailDateComponent implements OnInit {
  dateMoment = moment(new Date());
  formDate = new FormControl(this.dateMoment);
  week = '';
  year = '';
  date = '';

  constructor() {
    this.getDate();
  }

  ngOnInit() {
  }

  getDate() {
    this.date = this.dateMoment.format('MMM Do');
    this.week = this.dateMoment.format('dd');
    this.year = this.dateMoment.format('YYYY');
  }

  onChangeDate() {
    this.dateMoment = this.formDate.value;
    this.getDate();
  }

  onAddDate(val) {
    this.dateMoment.add(val, 'days');
    this.formDate.setValue(this.dateMoment);
    this.getDate();
  }

}
