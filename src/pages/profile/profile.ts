import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  ngOnInit(): void {
    // throw new Error("Method not implemented.");    //sekarang ni github punya
  }

  userid: any;
  defaultPicture: string;
  cameraData: string;
  lastImage: string = null;
  uploadDone: boolean = false;
  default: boolean = true;
  transferImg: string;

  staffsRef: AngularFireList<any>;
  staffs: Observable<any[]>;
  firstName: string;
  lastName: string;
  ic: string;
  birthDate: string;
  staffPosition: string;
  email: any;
  telephoneNo: number;

  staff: AngularFireObject<any>;
  staff$: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    private file: File, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
    private alertCtrl: AlertController, private afDatabase: AngularFireDatabase, private auth: AngularFireAuth) {

    this.auth.authState.subscribe((user) => {
      this.userid = user.uid;
      this.staff = this.afDatabase.object('users/' + user.uid);
      this.staff$ = this.staff.valueChanges();
      this.staff$.subscribe((u) => {
        this.firstName = u.first_name,
          this.lastName = u.last_name,
          this.birthDate = u.birthday,
          this.ic = u.ic_no,
          this.staffPosition = u.position,
          this.email = u.email,
          this.telephoneNo = u.contact
      })
    })

    this.defaultPicture = 'assets/imgs/default.png';

    // this.staffsRef = afDatabase.list('/staffs');
    // this.staffs = afDatabase.list('/staffs').valueChanges();




  }

  ionViewDidLoad() {
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

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      console.log("imagePathCamera", imagePath)
      this.cameraData = imagePath;
      this.transferImg = 'data:image/jpeg;base64,' + imagePath
      this.default = false;
      this.uploadDone = true;
      console.log("imagePathPublic", imagePath)
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private presentAlert(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  profileEdit() {
    let prompt = this.alertCtrl.create({
      title: 'Staff Information',
      message: "Are you sure want to submit your information?",
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
            if (this.firstName == undefined|| this.lastName == undefined|| this.ic == undefined|| this.birthDate == undefined|| this.staffPosition == undefined|| this.email == undefined|| this.telephoneNo == undefined) {
              this.presentAlert('Please complete the information.');
            } else {
              firebase.database().ref().child('users/' + this.userid).update({
                first_name: this.firstName,
                last_name: this.lastName,
                birthday: this.birthDate,
                ic_no: this.ic,
                position: this.staffPosition,
                email: this.email,
                contact: this.telephoneNo,
              })
              this.presentToast("Data have been successfully sumbitted.")
            }
          }
        }]
    });
    prompt.present();
  }

}
