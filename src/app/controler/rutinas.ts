//import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Rutinas {

  //List of APP variables used for visualizing the PLC variables
  public byteCommandMessage: string = "";
  public byteCommandArray: any;
  public voltajeBattery: any;
  public percentageBattery: any;
  public totalCycles: any;
  public partialCycles: any;
  public tempPLC: any;
  public workHours: any;
  public workMin: any;
  public workSeg: any;
  public numBypass: any;
  public flagS2: boolean= false;
  public flagS3: boolean= false;
  public flagS4: boolean= false;
  public flagS5: boolean= false;
  public flagS6: boolean= false;
  public flagS7: boolean= false;
  public flagS9: boolean= false;
  public flagS10: boolean= false;
  public flagS11: boolean= false;
  public flagS12: boolean= false;
  public flagS13: boolean= false;
  public flagS14: boolean= false;
  public flagS15: boolean= false;
  public flagM1: boolean= false;
  public flagM2: boolean= false;
  //*************************** */
  public flagH5: boolean= false;
  public flagH8: boolean= false;
  public flagH10: boolean= false;
  public flagH13: boolean= false;
  public flagH3: boolean= false;
  public flagH6: boolean= false;
  public flagH12: boolean= false;
  public flagH15: boolean= false;
  //*************************** */
  public flagH4: boolean= false;
  public flagH7: boolean= false;
  public flagH11: boolean= false;
  public flagH14: boolean= false;
  public flagH9: boolean= false;
  public flagH16: boolean= false;
  public flagHorns: boolean= false;
  public flagClose: boolean= false;
  //*************************** */
  public flagOpen: boolean= false;
  public flagPLCApagado: boolean= false;
  public flagNightMode: boolean= false;
  public flagBypass: boolean= false;
  public bypassTime: string= "";
  public flagNightMode2: boolean= false;
  //************************* */
  public flagH19 : boolean= false;
  public flagH23 : boolean= false;
  public flagH22 : boolean= false;
  public flagH17 : boolean= false;
  public flagH21 : boolean= false;
  public flagH20 : boolean= false;
  public flagH27 : boolean= false;
  public flagH26 : boolean= false;
  public flagH18 : boolean= false;
  public flagH25 : boolean= false;
  public flagH24 : boolean= false;




  constructor(public toastController: ToastController,
              public alertController: AlertController) {
  }

  arrayBuffer2str(buf: Uint8Array) {
    return this.bufToUtf16String(buf);
    //return String.fromCharCode.apply(null, new Uint16Array(buf));

  }

  // src/app/controler/rutinas.ts
private bufToUtf16String(buf: ArrayBuffer | ArrayBufferView): string {
  const ab = buf instanceof ArrayBuffer ? buf : buf.buffer;
  // Cambia 'utf-16le' por el encoding real si es otro (utf-8, etc.)
  return new TextDecoder('utf-16le').decode(new Uint8Array(ab));
}


  Str2ArrayBuffer(dataString: string) {
    let data = new Uint8Array(dataString.length);
    for (let i = 0; i < data.length; i++) {
      data[i] = dataString.charCodeAt(i);
    }
    return data;
  }

  ShowToast(mensaje: string) {
    let toast = this.toastController.create({
      message: mensaje,
      position: 'middle',
      duration: 2000
    });
    toast.then(res => res.present());
  }

  ShowAlert(mensaje: string) {
    const alert = this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    alert.then(res => res.present());
  }


  hexStringToFloat(hexString: string) {
    const hex = parseInt(hexString, 16);
    const sign = hex >> 31 ? -1 : 1;
    const exponent = (hex >> 23) & 0xFF;
    return sign * (hex & 0x7fffff | 0x800000) * 1.0 / Math.pow(2, 23) * Math.pow(2, (exponent - 127));
}
  
  //To separate every data by subject
  processData(mensaje: string){

    //This convert the string to array the whole message
    this.byteCommandArray = JSON.parse("[" + mensaje + "]");

    if (this.byteCommandArray[0] === 67){
      //CAN ID 6A5
      if (this.byteCommandArray[1] === 11 && this.byteCommandArray[3] === 6 && this.byteCommandArray[4] === 165){
        try{            
          //var previous =  this.byteCommandArray[6].toString(16).toString() + this.byteCommandArray[5].toString(16).toString();
          
           previous = this.byteCommandArray[8].toString(16).toString()  + this.byteCommandArray[7].toString(16).toString()  + this.byteCommandArray[6].toString(16).toString()  + "00".toString();

          //alert(this.byteCommandArray);
          
          //var final = parseInt((previous[0]+previous[1]+previous[2]+previous[3]),16)/1000;
           var final = this.hexStringToFloat(previous)/1000

          this.voltajeBattery = final.toFixed(1);
    
          //This variable must be interpreted
          this.percentageBattery = (16.66*this.voltajeBattery - 351.66).toFixed();
          //********************************* HAY QUE REVISAR LOS DWORD  **************************************** */
          //Calculating value of total cycles
          var aux = this.byteCommandArray[12].toString(16).toString() + this.byteCommandArray[11].toString(16).toString() + this.byteCommandArray[10].toString(16).toString() + this.byteCommandArray[9].toString(16).toString();
          this.totalCycles = parseInt((aux[0]+aux[1]+aux[2]+aux[3]+aux[4]+aux[5]+aux[6]+aux[7]),16);
          //********************************* HAY QUE REVISAR LOS DWORD  **************************************** */
        }
        catch(Error){
          //alert(Error.message);
        }      
      }
      //CAN ID 6A8
      if (this.byteCommandArray[1] === 11 && this.byteCommandArray[3] === 6 && this.byteCommandArray[4] === 168){
        try{
          //Calculating value of temperature
          var previous =  this.byteCommandArray[12].toString(16).toString() + this.byteCommandArray[11].toString(16).toString();
          var final = parseInt((previous[0]+previous[1]+previous[2]+previous[3]),16);
          this.tempPLC = final.toString();
          //********************************* HAY QUE REVISAR LOS DWORD  **************************************** */
          //Calculating value of working hours
          var aux = this.byteCommandArray[8].toString(16).toString() + this.byteCommandArray[7].toString(16).toString() + this.byteCommandArray[6].toString(16).toString() + this.byteCommandArray[5].toString(16).toString();
          this.workHours = parseInt((aux[0]+aux[1]+aux[2]+aux[3]+aux[4]+aux[5]+aux[6]+aux[7]),16);
          //********************************* HAY QUE REVISAR LOS DWORD  **************************************** */
          //Calculating value of minutes and seconds
          this.workSeg = this.byteCommandArray[10].toString();
          this.workMin = this.byteCommandArray[9];
        }
        catch(Error){
          //alert(Error.message);
        }
      }
      //CAN ID 6A4
      if (this.byteCommandArray[1] === 10 && this.byteCommandArray[3] === 6 && this.byteCommandArray[4] === 164){
        try{
          //Calculating value of partial cycles
          var previous =  this.byteCommandArray[11].toString(16).toString() + this.byteCommandArray[10].toString(16).toString();
          this.partialCycles = parseInt((previous[0]+previous[1]+previous[2]+previous[3]),16);
          //***************************************************** */
          //Calculating value of BYTE 1
          var byte1 = this.byteCommandArray[5].toString(2);
          //To complete the zeros in left
          for (let _i = byte1.length; _i < 8; _i++){
            byte1 = '0'+byte1;
          }
          this.flagS9 = (byte1[7] == '1'); //GLI_MANDO Sensor de mando
          this.flagS2 = (byte1[6] == '1'); //GLI_C1ABI Sensor abierto (Pata 1)
          this.flagS5 = (byte1[5] == '1'); //GLI_C2ABI Sensor abierto (Pata 2)
          this.flagS10 = (byte1[4] == '1'); //GLI_C3ABI Sensor abierto (Pata 3)
          this.flagS13 = (byte1[3] == '1'); //GLI_C4ABI Sensor abierto (Pata 4)
          this.flagS3 = (byte1[2] == '1'); //GLI_C1CER Sensor cerrado (Pata 1)
          this.flagS6 = (byte1[1] == '1'); //GLI_C2CER Sensor cerrado (Pata 2)
          this.flagS11 = (byte1[0] == '1'); //GLI_C3CER Sensor cerrado (Pata 3)



          //******************************************************/
          //Calculating value of BYTE 2
          var byte2 = this.byteCommandArray[6].toString(2);
          //To complete the zeros in left
          for (let _i = byte2.length; _i < 8; _i++){
            byte2 = '0'+byte2;
          }
          this.flagS14 = (byte2[7] == '1'); //GLI_C4CER Sensor cerrado (Pata 4)
          this.flagS4 = (byte2[6] == '1'); //GLI_P1CON Sensor landing (Pata 1)
          this.flagS7 = (byte2[5] == '1'); //GLI_P2CON Sensor landing (Pata 2)
          this.flagS12 = (byte2[4] == '1'); //GLI_P3CON Sensor landing (Pata 3)
          this.flagS15 = (byte2[3] == '1'); //GLI_P4CON Sensor landing (Pata 4)
          this.flagM1 = (byte2[2] == '1'); //OVER_LOADA Indicador sobrecarga Motor 1
          this.flagM2 = (byte2[1] == '1'); //OVER_LOADB Indicador sobrecarga Motor 2
          //this.flagSX = byte2[0]; //NO USED
          //******************************************************/
          //Calculating value of BYTE 3
          var byte3 = this.byteCommandArray[7].toString(2);
          //To complete the zeros in left
          for (let _i = byte3.length; _i < 8; _i++){
            byte3 = '0'+byte3;
          }
          this.flagH4 = this.flagH6 = (byte3[7] == '1'); //GLO_ROJOP1_DOWN Luz roja superior Portería 1
          //this.flagH8 = (byte3[6] == '1'); //GLO_ROJOP1_UP Luz roja inferior Portería 1
          this.flagH16 = this.flagH17 = (byte3[5] == '1'); //GLO_ROJORP2_DOWN Luz roja superior Portería 2
          //this.flagH10 = (byte3[4] == '1'); //GLO_ROJOP2_UP Luz roja inferior Portería 2
          this.flagH3 = this.flagH5 = (byte3[3] == '1'); //GLO_VERDEP1_DOWN Luz verde superior Portería 1
          //this.flagH6 = (byte3[2] == '1'); //GLO_VERDEP1_DOWN Luz verde inferior Portería 1
          this.flagH18 = this.flagH19 = (byte3[1] == '1'); //GLO_VERDEP2_DOWN Luz verde superior Portería 2
          //this.flagH12 = (byte3[0] == '1'); //GLO_VERDEP2_UP Luz verde inferior Portería 2
          //******************************************************/
          //Calculating value of BYTE 4
          var byte4 = this.byteCommandArray[8].toString(2);
          //To complete the zeros in left
          for (let _i = byte4.length; _i < 8; _i++){
            byte4 = '0'+byte4;
          }
         
          //alert(byte4);

          this.flagH11 = this.flagH14 = this.flagH13 = this.flagH12 = (byte4[7] == '1'); //GLO_AMBARP1_DOWN Luz ambar inferior Portería 1
          this.flagH7 = this.flagH8 = this.flagH9 = this.flagH10 = (byte4[6] == '1'); //GLO_AMBARP1_UP Luz ambar superior Portería 1
          this.flagH24 = this.flagH27 = this.flagH26 = this.flagH25 = (byte4[5] == '1'); //GLO_AMBARP2_DOWN Luz ambar inferior Portería 2
          this.flagH20 = this.flagH23 = this.flagH22 = this.flagH21 =(byte4[4] == '1'); //GLO_AMBARP2_UP Luz ambar superior Portería 2
          //this.flagH4 = this.flagH6 = (byte4[3] == '1'); //GLO_AZULP1_UP Luz azul superior Portería 1
          //this.flagH16 = this.flagH17 = (byte4[2] == '1'); //GLO_AZULP2_UP Luz azul superior Portería 2
          this.flagHorns = (byte4[1] == '1'); //GLO_SIRENAS Sirena
          this.flagClose = (byte4[0] == '1'); //GLO_CERRAR CONOS
          //******************************************************/
          //Calculating value of BYTE 5
          var byte5 = this.byteCommandArray[9].toString(2);
          //To complete the zeros in left
          for (let _i = byte5.length; _i < 8; _i++){
            byte5 = '0'+byte5;
          }
          this.flagOpen = (byte5[7] == '1'); //GLO_ABRIR CONOS
          this.flagPLCApagado = (byte5[6] == '1'); //GLO_PLC ON
          this.flagNightMode = (byte5[5] == '1'); //GLO_MODO NOCHE
          this.flagBypass = (byte5[4] == '1'); //BYPASS ORDER
          this.flagNightMode2 = (byte5[3] == '1'); //REPEAT THE FLAG NIGHTMODE
          //this.flagH16 = (byte5[2] == '1'); //Free
          //this.flagHorns = (byte5[1] == '1'); //Free
          //this.flagClose = (byte5[0] == '1'); //Free
        }
        catch(Error){
          //alert(Error.message);
        }
      }
      //CAN ID 6AB
      if (this.byteCommandArray[1] === 9 && this.byteCommandArray[3] === 6 && this.byteCommandArray[4] === 171){
        try{
          //Calculating value of bypass number
          var previous =  this.byteCommandArray[10].toString(16).toString() + this.byteCommandArray[9].toString(16).toString();
          this.numBypass = parseInt((previous[0]+previous[1]+previous[2]+previous[3]),16);
          //this.tempPLC = final.toString();
        }
        catch(Error){
          //alert(Error.message);
        }
      }
        //CAN ID 6AD
      if (this.byteCommandArray[1] === 7 && this.byteCommandArray[3] === 6 && this.byteCommandArray[4] === 173){
        try{            
          //********************************* HAY QUE REVISAR LOS UINT32  **************************************** */
          //Calculating value of bypass timer
          /*var aux = this.byteCommandArray[7].toString(16).toString() + this.byteCommandArray[6].toString(16).toString() + this.byteCommandArray[5].toString(16).toString();
          var valor = parseInt((aux[0]+aux[1]+aux[2]+aux[3]+aux[4]+aux[5]+aux[6]+aux[7]),16);
          this.bypassTime = valor + ' min';*/

          //var arrayPrueba = this.byteCommandArray[5] + this.byteCommandArray[6] + this.byteCommandArray[7] + this.byteCommandArray[8];
          let aux: [string,string,string,string] = ['0','0','0','0'];
          for (let _i = 5; _i < 9; _i++){
            var zeroFill = this.byteCommandArray[_i].toString(16);
            //console.log(zeroFill.length)
            if (zeroFill.length < 2){
                aux[_i-5] = '0'+zeroFill;
            }else{
                aux[_i-5] = zeroFill;
            }
          }
          var segBypass = parseInt((aux[3]+aux[2]+aux[1]+aux[0]),16)/1000;
          this.bypassTime = segBypass.toFixed() + ' seg';
          //********************************* HAY QUE REVISAR LOS UINT32  **************************************** */
        }
        catch(Error){
          //alert(Error.message);
        }
      }
    }else{

      this.byteCommandMessage = 'Error';

    }
      
  }
}
