import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserListingComponent } from './add-user-listing/add-user-listing.component';
import { PatientChangePasswordComponent } from './change-password/change-password.component';
import { KYCUploadComponent } from './kyc-upload/kyc-upload.component';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';
import { PatientAppComponent } from './patient-app.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentStatusListComponent } from './payment-status-list/payment-status-list.component';
import { UserviewComponent } from './userview/userview.component';

const routes: Routes = [
    {
        path: '',
        component: PatientAppComponent,
        children: [
            {
                path: 'user-dashboard',
                component: PatientDashboardComponent
            },
            {
                path: 'change-password',
                component: PatientChangePasswordComponent
            },
            {
                path: 'userlisting',
                component: AddUserListingComponent //to be removed
            },
            {
                path: 'user-list',
                component: ListOfUsersComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'kyc-upload',
                component: KYCUploadComponent
            },
            {
                path: 'payment-status-list',
                component: PaymentStatusListComponent
            },

             {
                 path: 'userview',
                 component: UserviewComponent
            },
        ]

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientAppRoutingModule {

}
