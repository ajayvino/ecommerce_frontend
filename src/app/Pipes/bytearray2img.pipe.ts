import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytearray2img'
})
export class Bytearray2imgPipe implements PipeTransform {

  public transform(value: any, contentType: string): any {
    var base64Content = `data:${contentType};base64,${value}`;
    return base64Content;
  }


}
