import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAlertComponent } from './componentes/pop-up-alert/pop-up-alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'contact';

  constructor(private modal: MatDialog) {}

  openAlert() {
    this.modal.open(PopUpAlertComponent, { panelClass: 'alert_modal' });
  }
}
