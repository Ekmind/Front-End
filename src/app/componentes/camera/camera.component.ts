import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoadscriptService } from 'src/app/services/loadscript.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements AfterViewInit {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;
  patient_id: any;
  appointment = {
    date: '',
    notes: '',
    emotional_data: [],
  };

  WIDTH = 1280;
  HEIGHT = 720;
  @ViewChild('video')
  public video!: ElementRef;
  error: any;
  constructor(
    private loadScript: LoadscriptService,
    private http: HttpClient,
    private router: Router
  ) {
    loadScript.load(['emotions']);
    loadScript.load(['charts']);
    loadScript.load(['selectcamera']);
  }
  async ngAfterViewInit() {
    this.patient_id = sessionStorage.getItem('patient_id');
    await this.setupDevices();
  }
  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  endSession() {
    this.http.post(
      this.localURL + `api/create/appointment/${this.patient_id}`,
      {},
      { withCredentials: true }
    );
  }
}
