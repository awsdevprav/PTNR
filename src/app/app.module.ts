import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ServerErrorInterceptor } from './interceptors';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthInterceptor } from './interceptors/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
// import { LoadingComponent } from './shared/loading/loading.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
        // LoadingComponent
    ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-center',
            newestOnTop: true,
            tapToDismiss: true,
            closeButton: true
        })
        
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorInterceptor,
            multi: true,
        }
        //,
        //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
