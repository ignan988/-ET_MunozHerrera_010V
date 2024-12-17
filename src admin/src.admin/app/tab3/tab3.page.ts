import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  capturedImage: string | undefined; 

  constructor() {}

  ngOnInit() {
    
    Camera.requestPermissions();
  }

  async leerQr() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true, 
        resultType: CameraResultType.Uri, 
        source: CameraSource.Camera
      });
    
};
}