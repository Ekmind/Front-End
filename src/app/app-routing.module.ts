import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home-page/home.component';
import { LogInComponent } from './componentes/log-in/log-in.component';
import { SignUpComponent } from './componentes/sign-up/sign-up.component';
import { CommentsComponent } from './componentes/comments/comments.component';
import { CameraComponent } from './componentes/camera/camera.component';
import { PatientProfileComponent } from './componentes/patient-profile/patient-profile.component';
import { PsychologistProfileComponent } from './componentes/psychologist-profile/psychologist-profile.component';
import { ExpedientComponent } from './componentes/expedient/expedient.component';
import { DemoCameraComponent } from './componentes/demo-camera/demo-camera.component';
import { ErrorpageComponent } from './componentes/errorpage/errorpage.component';
import { AuthguardGuard } from 'src/guards/authguard.guard';


const routes: Routes = [
  {
    path: '',   // Ruta sin componente
    children: [
      { path: '', component: HomeComponent }, 
      { path: 'sign-up', component: SignUpComponent },
      { path: 'comments', component: CommentsComponent },
      { path: 'camera', component: CameraComponent },
      { path: 'demo-camera', component: DemoCameraComponent },
      {
        path: 'patient-profile',
        canActivate: [AuthguardGuard],
        component: PatientProfileComponent
      },
      {
        path: 'expedient',
        canActivate: [AuthguardGuard],
        component: ExpedientComponent
      },
      {
        path: 'profile',
        canActivate: [AuthguardGuard],
        component: PsychologistProfileComponent
      },
      { path: 'log-in', component: LogInComponent },
      { path: '**', component: ErrorpageComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
