import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { Path } from './core/enums';
import { AuthguardService } from './guard/authguard.service';

const routes: Routes = [
    {
        path: Path.Auth,
        loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule),
        canDeactivate: [AuthguardService]
    },
    {
        path: Path.User,
        loadChildren: () => import('./components/patient-app/patient-app.module').then((m) => m.PatientAppModule),
    //    canActivate: [AuthguardService]
    },
    {
        path: '',
        redirectTo: Path.Auth,
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
