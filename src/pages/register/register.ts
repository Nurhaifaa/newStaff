import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { StaffListPage } from '../staff-list/staff-list';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  defaultPicture: string;
  cameraData: string;
  lastImage: string = null;
  uploadDone: boolean = false;
  default: boolean = true;
  // transferImg: string;

  staffsRef:AngularFireList<any>;
  staffs:Observable<any[]>;
  name: string;
  ic: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    private file: File, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
    private alertCtrl: AlertController, afDatabase: AngularFireDatabase) {

      this.defaultPicture = 'assets/imgs/default.png';

      this.staffsRef = afDatabase.list('/staffs');
      this.staffs = afDatabase.list('/staffs').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Your Image',
      buttons: [
        {
          text: 'Photo Gallery',
          icon: 'images',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWitdh: 1000,
      targetHeight: 1000
    };
  }

    // Get the data of an image
  //   this.camera.getPicture(options).then((imagePath) => {
  //     console.log("imagePathCamera", imagePath)
  //     this.cameraData = imagePath;
  //     this.transferImg = 'data:image/jpeg;base64,' + imagePath
  //     this.default = false;
  //     this.uploadDone = true;
  //     console.log("imagePathPublic", imagePath)
  //   }, (err) => {
  //     this.presentToast('Error while selecting image.');
  //   });
  // }

  // private presentToast(text) {
  //   let toast = this.toastCtrl.create({
  //     message: text,
  //     duration: 3000,
  //     position: 'bottom'
  //   });
  //   toast.present();
  // }

  goSubmit(){
    let prompt = this.alertCtrl.create({
      title: 'Staff Information',
      message: "Are you sure want to submit your information?",
      // inputs: [
      //   {
      //     name: 'title',
      //     placeholder: 'Title'
      //   },                  p/s: ni coding yg ble kita pop up baru kita input,
                            //tapi kita xnk input dri sini
                            //kita nak input kt ion-input tp data tu nak bwk ke dlm ni
      // ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            const newStaffRef = this.staffsRef.push({});
   
            newStaffRef.set({
              id: newStaffRef.key,
              name: data.name,
              ic: data.identity
              // title: data.title   -- yg ni nak kena bwak tu dari ion-input
              // tp xtaw mcm mana
            });
          }
        }
      ]
    });
    prompt.present();
  }

  goList(){
    this.navCtrl.push(StaffListPage);
  }
}
