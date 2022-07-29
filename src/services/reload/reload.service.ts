import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ExpedientComponent } from 'src/app/componentes/expedient/expedient.component';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  private subjectName = new Subject<any>();

  askForReload(reload: boolean | false) {
    this.subjectName.next({ reload: reload });
  }

  reload(): Observable<any> {
    return this.subjectName.asObservable();
  }
}
