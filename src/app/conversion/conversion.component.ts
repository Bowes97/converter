import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { ICurrency } from '../shared/interfaces/currency.interface';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss']
})
export class ConversionComponent implements OnInit {
  public response!: ICurrency[];
  public currency = [
    { currency: 'UAH' },
    { currency: 'USD' },
    { currency: 'EUR' },
  ];
  public first: string = '';
  public second: string = '';
  public give!: any;
  public take!: any;
  public t: boolean = true;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCurrency();
  }

  getCurrency(): void {
    this.http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').subscribe((response: any) => {
      this.response = response.slice(0, 2);
    })
  }

  setFirstVariable(e: any): void {
    this.first = e.target.innerHTML;
  }

  setSecondVariable(e: any): void {
    this.second = e.target.innerHTML;
  }

  changeBTN(): void {
    this.t = true;
  }

  setNumber(): void {
    let buyUSD = this.response[0].buy as any;
    let buyEUR = this.response[1].buy as any;
    let saleUSD = this.response[0].sale as any;
    let saleEUR = this.response[1].sale as any;
    let buyUAHtoDolar: number = 1 / saleUSD;
    buyUAHtoDolar.toString().slice(0, 7);
    let buyUAHtoEURO: number = 1 / saleEUR;
    buyUAHtoEURO.toString().slice(0, 7);
    let euroTousd: number = saleEUR / saleUSD;
    euroTousd.toString().slice(0, 7);
    if (this.take && this.give) {
      this.take = null;
      this.give = null;
    } else {
      if (this.first === ' USD ' && this.second === ' UAH ') {
        if (!this.take) {
          let sum;
          sum = this.give * buyUSD;
          this.take = sum.toString().slice(0, 7);
          this.t = false;
        } else {
          let sum;
          sum = this.take * buyUAHtoDolar;
          this.give = sum.toString().slice(0, 7);
          this.t = false;
        }
      }
      if (this.first === ' EUR ' && this.second === ' UAH ') {
        if (!this.take) {
          let sum;
          sum = this.give * buyEUR;
          this.take = sum.toString().slice(0, 7);
          this.t = false;
        } else {
          let sum;
          sum = this.take * buyUAHtoEURO;
          this.give = sum.toString().slice(0, 7);
          this.t = false;
        }
      }
      if (this.first === ' UAH ' && this.second === ' USD ') {
        if (!this.take) {
          let sum;
          sum = this.give * buyUAHtoDolar;
          this.take = sum.toString().slice(0, 7);
          this.t = false;
        } else {
          let sum;
          sum = this.take * buyUSD;
          this.give = sum.toString().slice(0, 7);
          this.t = false;
        }
      }
      if (this.first === ' UAH ' && this.second === ' EUR ') {
        if (!this.take) {
          let sum;
          sum = this.give * buyUAHtoEURO;
          this.take = sum.toString().slice(0, 7);
          this.t = false;
        } else {
          let sum;
          sum = this.take * buyEUR;
          this.give = sum.toString().slice(0, 7);
          this.t = false;
        }
      }
      if (this.first === ' USD ' && this.second === ' EUR ') {
        if (!this.take) {
          let sum;
          sum = this.give * euroTousd;
          this.take = sum.toString().slice(0, 7);
          this.t = false;
        } else {
          let sum;
          sum = this.take * euroTousd;
          this.give = sum.toString().slice(0, 7);
          this.t = false;
        }
      }
      if (this.first === ' EUR ' && this.second === ' USD ') {
        if (!this.take) {
          let sum;
          sum = this.give * euroTousd;
          this.take = sum.toString().slice(0, 7);
          this.t = false;
        } else {
          let sum;
          sum = this.take * euroTousd;
          this.give = sum.toString().slice(0, 7);
          this.t = false;
        }
      }
      if (this.first === ' UAH ' && this.second === ' UAH ') {
        if (!this.take) {
          this.take = this.give;
          this.t = false;
        } else {
          this.give = this.take;
          this.t = false;
        }
      }
      if (this.first === ' EUR ' && this.second === ' EUR ') {
        if (!this.take) {
          this.take = this.give;
          this.t = false;
        } else {
          this.give = this.take;
          this.t = false;
        }
      }
      if (this.first === ' USD ' && this.second === ' USD ') {
        if (!this.take) {
          this.take = this.give;
          this.t = false;
        } else {
          this.give = this.take;
          this.t = false;
        }
      }
    }
  }
}
