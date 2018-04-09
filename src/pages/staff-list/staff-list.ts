import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-staff-list',
  templateUrl: 'staff-list.html',
})
export class StaffListPage {

  staffs:Observable<any[]>;
  name: string;
  ic: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffListPage');
    console.log("name", this.name);
    console.log("ic", this.ic);

    // const staffs: afDatabase.database.Reference = firebase.database().ref(`/person1/`);
    // staffs.on('value', personSnapshot => {
      // myPerson = personSnapshot.val();
    // });

    // this.staffs = this.staffs
    //   .getStaffList()
    //   .snapshotChanges()
    //   .map(
    //     changes => {
    //       return changes.map(c => ({
    //         key: c.payload.key, ...c.payload.val()
    //       })
    //     )
    //     }
    //   )
  }


}
