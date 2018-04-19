import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-staff-list',
  templateUrl: 'staff-list.html',
})
export class StaffListPage {

  staffsRef:AngularFireList<any>;
  staffs:Observable<any[]>;

  firstName: string;
  lastName: string;
  ic: string;
  position: string;
//try la
//da konfius ni
  constructor(public navCtrl: NavController, public navParams: NavParams, afDatabase: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public authData: AuthProvider) {

    this.staffsRef = afDatabase.list('/users');
    this.staffs = this.staffsRef.valueChanges();    
  }

  ionViewDidLoad() {
  }

  showOptions(staffId, staffFirstName, staffLastName, staffIc, staffPosition) {
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
            this.updateStaff(staffId, staffFirstName, staffLastName, staffIc, staffPosition);
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

  updateStaff(staffId, staffFirstName, staffLastName, staffIc, staffPosition){
    let prompt = this.alertCtrl.create({
      title: 'Staff Name and Staff Ic',
      message: "Update the name or ic for this staff",
      inputs: [
        {
          name: 'First Name',
          placeholder: 'First Name',
          value: staffFirstName
        },
        {
          name: 'Last Name',
          placeholder: 'Last Name',
          value: staffLastName
        },
        {
          name: 'ic',
          placeholder: 'Ic',
          value: staffIc
        },
        {
          name: 'position',
          placeholder: 'Position',
          value: staffPosition
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
              firstName: data.firstName, 
              lastName: data.lastName,
              ic: data.ic,
              staffPosition: data.position
            });
          }
        }
      ]
    });
    prompt.present();
  }

  userLogout(){
    this.authData.userLogout().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  editProfile(){
    this.navCtrl.push('ProfilePage');
  }

}
