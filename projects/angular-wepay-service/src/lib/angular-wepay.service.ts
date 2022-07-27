import { Injectable } from '@angular/core';
import { WePay } from './types';

const WEPAY_API_URL = "https://cdn.wepay.com/wepay.min.js";

@Injectable({
  providedIn: 'root'
})
/**
 * This service has a `wepay` property to that gets
 * initialized to `window["WePay"]`.
 * 
 * The constructor calls `inject()` which will
 * inject a script tag with containing the URL that loads
 * wepay and return a `Promise<WePayFactory>`.
 * 
 * The script tag will only load wepay if 
 * it is not available.
 * 
 * If `window["WePay"]` is available then `inject()` resolves 
 * the promise with that instance immediately, and does not create and 
 * wait for the script tag to load.
 * 
 *  
 */
export class AngularWePayService{

  // @ts-ignore
  private _wepay:WePay = window['WePay']
  private wePayPromise:Promise<any>

  constructor() { 
    this.wePayPromise = this.inject()
  }

  get wepay() {
    return this._wepay;
  } 
  set wepay(s:WePay) {
    this._wepay = s;
  }

  create():Promise<WePay>{
    return this.wePayPromise.then( () => {
      return this.wepay;
    })
  }

  inject():Promise<WePay>{

    if( this.wepay ){
      return Promise.resolve( this.wepay )
    }

    return new Promise((res,rej)=>{
      const head = this.getHeadElement()
      const script = document.createElement("script")
      script.setAttribute("type", "text/javascript")
      script.setAttribute("src", WEPAY_API_URL)      
      head.appendChild(script)      
      script.addEventListener("load",()=>{
        // @ts-ignore
        this.wepay = window["WePay"];
        res( this.wepay )
      })
    })
  }

  /**
   * Returns the `head` element.
   * @throws Error('Application does not have a head element');
   */
  getHeadElement(){
    let elm:HTMLElement = document.getElementsByTagName("head")[0]

    if(!elm) {
      throw new Error('Application does not have a head element');
    }    
    return elm;
  }  
}
