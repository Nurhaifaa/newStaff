import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-staff-list',
  templateUrl: 'staff-list.html',
})
export class StaffListPage {

  staffsRef:AngularFireList<any>;
  staffs:Observable<any[]>;

  name: string;
  ic: string;
//try la
  constructor(public navCtrl: NavController, public navParams: NavParams, afDatabase: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {

    this.staffsRef = afDatabase.list('/staffs');
    this.staffs = afDatabase.list('/staffs').valueChanges();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffListPage');

    console.log("name", this.name);
    console.log("ic", this.ic);
  }

  showOptions(staffId, staffName, staffIc) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Staff',
          role: 'destructive',
          handler: () => {
            this.removeStaff(staffId);
          }
        },{
          text: 'Update name',
          handler: () => {
            this.updateStaff(staffId, staffName, staffIc);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeStaff(staffId: string){
    this.staffsRef.remove(staffId);
  }

  updateStaff(staffId, staffName, staffIc){
    let prompt = this.alertCtrl.create({
      title: 'Staff Name and Staff Ic',
      message: "Update the name or ic for this staff",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: staffName
        },
        {
          name: 'ic',
          placeholder: 'Ic',
          value: staffIc
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.staffsRef.update(staffId, {
              name: data.name,
              ic: data.ic
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
