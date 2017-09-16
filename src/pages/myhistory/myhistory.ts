import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from "angularfire2";

/*
  Places visited  
*/

export class EventDate {
  day: string;
  month: string;
  month_name: string;
  time: string;
  full: string;
}

export class Checkin{
  id: string;
  user: string;
  date: EventDate;
  placeAddress: string;
  placeName: string;

  constructor(){
    this.date = new EventDate();
  }
}

@Component({
  selector: 'myhistory-page',
  templateUrl: 'myhistory.html'
})

export class MyHistoryPage {
  list: FirebaseListObservable<any>;
  checkin: Checkin;

  constructor(public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
    this.list = this.af.database.list('/checkins');
    this.checkin = new Checkin();
  }

  add(){
    this.checkin.user = '1';

    var date = this.checkin.date.full;

    var fields = date.split('-');

    this.checkin.date.day = fields[2];
    this.checkin.date.month = fields[1];
    this.checkin.date.time = fields[0];
    this.checkin.date.month_name = fields[1];

    this.list.push(this.checkin).then(() => {
      this.checkin = new Checkin();
    });
  }

  edit(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyhistoryPage');
  }

}
