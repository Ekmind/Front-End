import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadscriptService } from 'src/app/services/loadscript.service';
//import { emo } from 'src/assets/scripts/info';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit{
  WIDTH = 1280;
  HEIGHT = 720;
  @ViewChild("video")
  public video!: ElementRef;
  error: any;
  
  constructor(private loadScript: LoadscriptService) {
    loadScript.load(["emotions"]);
    loadScript.load(["charts"]);
    loadScript.load(["selectcamera"]);
    this.emotionsInfo();
  };
  async ngAfterViewInit() {
    await this.setupDevices();
    
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        const tracks = stream.getTracks();
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        }
        else {
          this.error = "You have no output video device";

        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  emotionsInfo(){
    window.addEventListener(globalThis.CY.modules().FACE_EMOTION.eventName, (evt) => {
      const emotions = evt.detail.output.emotion;
      console.log(emotions);
    });
  }
}









