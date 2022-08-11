import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  DoCheck,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadscriptService } from 'src/app/services/loadscript.service';
import { environment } from 'src/environments/environment';
import { ReloadService } from 'src/services/reload/reload.service';

declare var emotionalData: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements AfterViewInit, DoCheck {
  private readonly mainURL = `${environment.apiURL}`;
  private readonly localURL = `${environment.localURL}`;
  patient_id: any;
  notesData = this.formBuilder.group({
    notes: '',
  });

  emotionalArray = <any>[];
  emotional_data = <any>[];

  switch = false;

  WIDTH = 1280;
  HEIGHT = 720;
  @ViewChild('video')
  public video!: ElementRef;
  error: any;
  constructor(
    private loadScript: LoadscriptService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private reload: ReloadService
  ) {
    loadScript.load(['emotions']);
    loadScript.load(['charts']);
    loadScript.load(['selectcamera']);
    emotionalData();
  }

  ngDoCheck(): void {
    // if (this.switch === true) {}
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
        const tracks = stream.getTracks();
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

  emotionsInfo() {
    this.emotionalArray = sessionStorage.getItem('emotional data');

    this.emotional_data = JSON.parse(this.emotionalArray);

    console.log(this.emotional_data);
  }

  switchOn() {
    this.switch = true;
  }

  switchOff() {
    this.switch = false;
  }

  endSession(notes: any) {
    let newDate = new Date();
    const dd = newDate.getDate();
    const mm = newDate.getMonth() + 1;
    const yyyy = newDate.getFullYear();

    const date = dd + '/' + mm + '/' + yyyy;

    console.log(date);

    this.emotionalArray = sessionStorage.getItem('emotional data');

    this.emotional_data = JSON.parse(this.emotionalArray);

    // JSON.stringify(notes.notes);

    this.http
      .post(
        this.localURL + `api/create/appointment/${this.patient_id}`,
        {
          date: date,
          notes: notes.notes,
          emotional_data: this.emotional_data,
        },
        { withCredentials: true }
      )
      .subscribe((res: any) => {
        console.log(res);
        sessionStorage.removeItem('emotional data');
        this.reload.askForReload(true);
        this.router.navigate(['/patient-profile']);
      });
  }
}
