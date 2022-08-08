import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HomeComponent } from './componentes/home-page/home.component';
import { LogInComponent } from './componentes/log-in/log-in.component';
import { SignUpComponent } from './componentes/sign-up/sign-up.component';
import { CommentsComponent } from './componentes/comments/comments.component';
import { CameraComponent } from './componentes/camera/camera.component';
import { PatientProfileComponent } from './componentes/patient-profile/patient-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { PsychologistProfileComponent } from './componentes/psychologist-profile/psychologist-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ExpedientComponent } from './componentes/expedient/expedient.component';
import { DemoCameraComponent } from './componentes/demo-camera/demo-camera.component';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpAlertComponent } from './componentes/pop-up-alert/pop-up-alert.component';
import { PopUpUpdateComponent } from './componentes/pop-up-update/pop-up-update/pop-up-update.component';
import { PopUpGraphComponent } from './componentes/pop-up-graph/pop-up-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LogInComponent,
    SignUpComponent,
    CommentsComponent,
    CameraComponent,
    PatientProfileComponent,
    PsychologistProfileComponent,
    ExpedientComponent,
    DemoCameraComponent,
    PopUpAlertComponent,
    PopUpUpdateComponent,
    PopUpGraphComponent,
  ],
  entryComponents: [PopUpAlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
  ],
  providers: [CookieService, ExpedientComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
