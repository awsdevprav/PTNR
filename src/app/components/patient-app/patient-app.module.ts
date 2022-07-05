import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PatientAppRoutingModule } from './patient-app-routing.module';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { PatientAppComponent } from './patient-app.component';
import { PatientSidebarComponent } from './patient-sidebar/patient-sidebar.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientChangePasswordComponent } from './change-password/change-password.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ProfileComponent } from './profile/profile.component';
import { AddUserListingComponent } from './add-user-listing/add-user-listing.component';
import { SortDirective } from '../../directive/sort.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { KYCUploadComponent } from './kyc-upload/kyc-upload.component';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';
import { PaymentStatusListComponent } from './payment-status-list/payment-status-list.component';
import { UserviewComponent } from './userview/userview.component';
import { ViewAffiliatesDetailComponent } from './view-affiliates-detail/view-affiliates-detail.component';

@NgModule({
    declarations: [
        PatientDashboardComponent,
        PatientHeaderComponent,
        PatientAppComponent,
        PatientSidebarComponent,
        PatientChangePasswordComponent,
        ProfileComponent,
        AddUserListingComponent,
        SortDirective,
        KYCUploadComponent,
        ListOfUsersComponent,
        PaymentStatusListComponent,
        UserviewComponent,
        ViewAffiliatesDetailComponent
    ],
    imports: [
        CommonModule,
        PatientAppRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgOtpInputModule,
        NgxPaginationModule
    ],
    providers: [DatePipe]
})
export class PatientAppModule { }
