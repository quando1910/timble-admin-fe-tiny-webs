
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class PicturesService {
  compressImage$: Subject<any>;

  constructor() {
    this.compressImage$ = new BehaviorSubject<any>(null);
  }

  dataURLToBlob(b64Data: String, contentType = 'image/jpg', sliceSize = 512) {
    const byteCharacters = atob(b64Data.replace(/^data:image\/[a-z]+;base64,/, '').replace(/\s/g, ''));
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  setCompressImage(value) {
    this.compressImage$.next(value);
  }

  /**
   * [progress description]
   * @method getOrientation
   * @param  {file: File, callback: any}
   * @return Number
   */
  getOrientation(file: File, callback: any) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const target: any = event.target;
      const view = new DataView(target.result);

      if (view.getUint16(0, false) !== 0xFFD8) {
        return callback(-2);
      }

      const length = view.byteLength;
      let offset = 2;

      while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;

        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) {
            return callback(-1);
          }
          const little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;

          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
          }
        // tslint:disable-next-line:no-bitwise
        } else if ((marker & 0xFF00) !== 0xFF00) {
          break;
        } else {
          offset += view.getUint16(offset, false)
        }
      }
      return callback(-1);
    };

    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  }

  /**
   * [progress description]
   * @method compressImageFile
   * @param  {file: any, maxWidth = 2048, maxHeight = 1365, dimension = 240}        show [description]
   * @return {Blob file}       [description]
   */
  compressImageFile(file: any, maxWidth = 2048, maxHeight = 1365, compress = 0.8) {
    if (file.type.match(/image.*/)) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      return new Promise((resolve, reject) => {
        image.onload = () => {

          // Get the orientation of image
          this.getOrientation(file, (orientation: Number) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let width = image.width;
            let height = image.height;
            // resize Image with maxWidth & maxHeight
            if (width >  maxWidth) {
              height = height * maxWidth / width;
              width = maxWidth;
            }
            if (height >  maxHeight) {
              width = width * (maxHeight / height);
              height = maxHeight;
            }

            // set proper canvas dimensions before transform & export
            if (4 < orientation && orientation < 9) {
              canvas.width = height;
              canvas.height = width;
            } else {
              canvas.width = width;
              canvas.height = height;
            }

            // transform context before drawing image
            switch (orientation) {
              case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
              case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
              case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
              case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
              case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
              case 7: ctx.transform(0, -1, -1, 0, height, width); break;
              case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
              default: break;
            }

            // draw image
            ctx.drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', compress);
            resolve(dataUrl);
          });
        };
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }
  }
}
