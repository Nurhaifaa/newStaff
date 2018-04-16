import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private formBuilder: FormBuilder, public authData: AuthProvider, public loadingCtrl: LoadingController) {

      this.loginForm = formBuilder.group({
        email: [
          '',
          Validators.compose([Validators.required, EmailValidator.isValid]),
        ],
        password: [
          '',
          Validators.compose([Validators.minLength(6), Validators.required]),
        ],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  userLogin(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.userLogin(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {
          this.navCtrl.setRoot('StaffListPage');
        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "OK",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
    }
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

}
