import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffListPage } from './staff-list';

@NgModule({
  declarations: [
    StaffListPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffListPage),
  ],
})
export class StaffListPageModule {}
