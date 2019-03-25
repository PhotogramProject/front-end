import { Injectable } from '@angular/core';
declare const M: any;

@Injectable()
export class ToastrService {

  constructor() { }
  toast(text: string, cb?) {
    M.toast({html: text, displayLength: 2000, classes: 'over-index'}, cb);
  }

  warningToast(text: string, cb?) {
    M.toast({html: text, displayLength: 2000, classes: 'orange darken-2 over-index'}, cb);
  }

  successToast(text: string, cb?) {
    M.toast({html: text, displayLength: 2000, classes: 'green darken-2 over-index'}, cb);
  }

  errorToast(text: string, cb?) {
    M.toast({html: text, displayLength: 2000, classes: 'red darken-2 over-index'}, cb);
  }
}
