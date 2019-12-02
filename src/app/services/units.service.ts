import { Injectable } from '@angular/core';
import { BigNumber } from 'bignumber.js';
import { Qty } from 'qty';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  units = [ {key: 'in', system: 'imperial', base: 'in', title: 'Inches'},
            {key: 'ffi', system: 'imperial', base: 'in', title: 'Feet Fractional Inch'},
            {key: 'fdi', system: 'imperial', base: 'in', title: 'Feet Decimal Inch'},
            {key: 'ft', system: 'imperial', base: 'in', title: 'Feet'},
            {key: 'mm', system: 'metric', base: 'in', title: 'Millimeter'},
            {key: 'cm', system: 'metric', base: 'in', title: 'Centimeter'},
            {key: 'm', system: 'metric', base: 'in', title: 'Meter'},
            {key: 'ft', system: 'imperial', base: 'ft', title: 'Feet'},
            {key: 'm', system: 'metric', base: 'ft', title: 'Meter'},
            {key: 'fpm', system: 'imperial', base: 'fpm', title: 'Feet/Minute'},
            {key: 'mpm', system: 'metric', base: 'fpm', title: 'Meter/Minute'},
            {key: 'lbs', system: 'imperial', base: 'lbs', title: 'Pounds'},
            {key: 'kg', system: 'metric', base: 'lbs', title: 'Kilograms'}
          ];
  currentInchesKey = 'in';

  constructor() { }

  round(input: number, decimals: number): number {
    const pow = Math.pow(10, decimals);
    return Math.round(input * pow) / pow;
  }

  inToFfi(input: number): string {
    // ported from vfp DecToFFIn
    const neg = input < 0;
    const length = Math.abs(input);
    const feet = Math.floor(length / 12);
    const inches = Math.floor(length - (feet * 12));
    const dec = length - (feet * 12) - inches;
    const x = new BigNumber(dec.toFixed(15));
    const fraction = x.toFraction(64);

    let result = neg ? '-' : '';
    if (feet > 0) {
       result += feet + '\' ';
    }
    result += inches;
    if (dec > 0) {
       result += '-' + fraction[0] + '/' + fraction[1];
    }
    result += '\"';
    return result;
 }

 inToFdi(input: number): string {
    const neg = input < 0;
    const length = Math.abs(input);
    const feet = Math.floor(length / 12);
    const inches = length - (feet * 12);
    let result = neg ? '-' : '';
    if (feet > 0) {
       result += feet + '\' ';
    }
    result += inches + '\"';
    return result;
 }

  fpmToMpm(input: number): number {
    const inputQty = new Qty(input, 'ft');
    const outQty = inputQty.to('m');
    // var pow = Math.pow(10,decimals);
    // var rounded = Math.round(outQty.scalar*pow)/pow;
    const rounded = Math.round(outQty.scalar);
    return rounded;
  }

  getUserUnits(type: string): string {
    if (type === '' || type === 'min' || type === '%' || type === 'ga') { return type; }

    const systemBaseUnitKey = this.currentInchesKey;
    let systemUnit = {key: 'in', system: 'imperial', base: 'in'};

    for (let i = 0; i < this.units.length; i++) {
       if (this.units[i].key === systemBaseUnitKey) {
          systemUnit = this.units[i];
          break;
       }
    }

    if (type === systemUnit.base) {
       return systemUnit.key;
    }

    for (let j = 0; j < this.units.length; j++) {
       if (this.units[j].base === type &&
          this.units[j].system === systemUnit.system) {
          return this.units[j].key;
       }
    }

    // didn't find a conversion. Give up.
    console.log('no conversion for unit:' + type);
    return type;
  }

  formatUnits(input: number, inType: string, outType: string, decimals: number, hideType: boolean): string {
    // sanitize inputs
    if (!input) {
       input = 0;
    }
    if (!decimals || decimals < 0) {
       decimals = 0;
    }

    if (inType === outType) {
       return this.round(input, decimals) + (hideType ? '' : ' ' + outType);
    }

    // special formats
    switch (outType) {
       case 'fdi':
          return this.inToFdi(input);
       case 'ffi':
          return this.inToFfi(input);
       case 'mpm':
          const mpm = this.fpmToMpm(input);
          return mpm + (hideType ? '' : ' ' + outType);
    }

    // the rest can just use the js-quantity conversion
    const inputQty = new Qty(input, inType);
    const outQty = inputQty.to(outType);
    return this.round(outQty.scalar, decimals) + (hideType ? '' : ' ' + outType);
  }

  formatUserUnits(input: number, inType: string, decimals: number, hideType: boolean, outType: string): string {
    if (!input && input !== 0) {
      return '';
    } // if undefined or NaN (null?) but no 0
    if (!decimals || decimals < 0) {
        decimals = 0;
    }

    if (inType === '%') {
        return this.round(input * 100, decimals) + (hideType ? '' : '%');
    }
    if (inType === 'min') {
        return this.round(input, decimals) + (hideType ? '' : ' min'); // todo:i18n
    }
    if (inType === '') { return input + ''; }

    if (!outType || outType === '') {
        outType = this.getUserUnits(inType);
    }
    return this.formatUnits(input, inType, outType, decimals, hideType);
  }

  convertUnits(input: number, inType: string, decimals: number, outType?: string): number {
    if (!input) { return 0; }
    if (!decimals || decimals < 0) {
       decimals = 0;
    }
    if (inType === '%') {
       return this.round(input * 100, decimals);
    }
    if (inType === 'min') {
       return this.round(input, decimals);
    }

    if (!outType) {
       outType = this.getUserUnits(inType);
    }

    if (inType === outType) {
       return this.round(input, decimals);
    }

    switch (outType) {
       case 'ffi':
       case 'fdi': // currently, there is no way this would be anything other than inches on both sides
          // outType = 'in';
          // break;
          return this.round(input, decimals);
       case 'mpm':
          inType = 'ft';
          outType = 'm';
          break;
    }

    const inputQty = new Qty(input, inType);
    const outQty = inputQty.to(outType);
    return this.round(outQty.scalar, decimals);
  }

  shortenBigNumber(input: number, inType: string, decimals: number): string {
    if (input === null) { return ''; }
    if (input === 0) { return '0'; }

    input = this.convertUnits(input, inType, decimals, undefined); // not sure id decimals is correct here

    let abs = Math.abs(input);
    const rounder = Math.pow(10, decimals);
    const isNegative = input < 0;
    let key = '';
    const powers = [
       {key: 'Q', value: Math.pow(10, 15)},
       {key: 'T', value: Math.pow(10, 12)},
       {key: 'B', value: Math.pow(10, 9)},
       {key: 'M', value: Math.pow(10, 6)},
       {key: 'K', value: 1000}
    ];

    for (let i = 0; i < powers.length; i++) {
       let reduced = abs / powers[i].value;
       reduced = Math.round(reduced * rounder) / rounder;
       if (reduced >= 1) {
          abs = reduced;
          key = powers[i].key;
          break;
       }
    }
    return (isNegative ? '-' : '') + abs + key;
  }

  getUserDisplayUnits(type: string): string {
    if (type === '%') { return '%'; }
    const userType = this.getUserUnits(type);
    switch (userType) {
       case 'ffi' :
          return '';
       case 'fdi' :
          return '';
    }
    return userType;
  }

  getBaseUnits() {
    return this.units.filter((unit) => unit.base === 'in');
  }
}
