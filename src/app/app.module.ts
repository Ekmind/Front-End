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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule,ReactiveFormsModule,BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
