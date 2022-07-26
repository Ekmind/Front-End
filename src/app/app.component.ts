import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAlertComponent } from './componentes/pop-up-alert/pop-up-alert.component';
import { PopUpUpdateComponent } from './componentes/pop-up-update/pop-up-update/pop-up-update.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'contact';
  patient_id: any;

  constructor(private modal: MatDialog) {}

  openPatientUpdate() {
    this.modal.open(PopUpUpdateComponent);
  }

  openAlert() {
    this.modal.open(PopUpAlertComponent, { panelClass: 'alert_modal' });
  }
}
