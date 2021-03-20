import { BdService } from './../servicios/bd.service';
import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  codigo: string = 'Sin enviar';
  contador: number = 0;
  timer: any;

  constructor(
    private backgroundMode: BackgroundMode,
    private bd: BdService,
    public platform: Platform
  ) {
    platform.ready().then( () => {
      this.backgroundMode.enable();
      this.backgroundMode.on('activate').subscribe(() => {
        this.backgroundMode.disableWebViewOptimizations();
        this.timer = setInterval(()=>{
          this.bd.testagregarPosicion(this.codigo, {lat: this.contador, lng: this.contador});
          this.contador++;
        }, 2000);
      });
      this.backgroundMode.disableBatteryOptimizations();
    });
  }

  generarCodigo(): string {
    return Math.random().toString(36).slice(-6);
  }

  iniciar(){
    this.codigo = this.generarCodigo();
    this.bd.testainiciarruta(this.codigo)
    this.timer = setInterval(()=>{
      this.bd.testagregarPosicion(this.codigo, {lat: this.contador, lng: this.contador});
      this.contador++;
    }, 2000);
  }

  parar(){
    clearInterval(this.timer);
    this.contador = 0;
  }

}
