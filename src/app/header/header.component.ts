import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICurrency } from '../shared/interfaces/currency.interface';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public EURBuy!: string;
  public EURSale!: string;
  public USDBuy!: string;
  public USDSale!: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo(): void {
    this.http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').subscribe((response: any) => {
      response.slice(0, 2);
      this.EURBuy = response[1].buy;
      this.EURSale = response[1].sale;
      this.USDBuy = response[0].buy;
      this.USDSale = response[0].sale;
    })
  }
}