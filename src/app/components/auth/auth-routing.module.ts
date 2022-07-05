import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Path } from 'app/core/enums';
import { AuthComponent } from './auth.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { ResetPasswordWithUsernameComponent } from './reset-password-with-username/reset-password-with-username.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StorageService } from '../../services/common/storage.service';
const routes: Routes = [
    {
        path: 'sign-in',
        component: PatientLoginComponent
    },
    {
        path: '',
        component: PatientLoginComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'change-password',
        component: ResetPasswordWithUsernameComponent
    }
    ,
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    }
    ,
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
    // ]

    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
