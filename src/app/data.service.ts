import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  private result: any;
  // Currently 60 coins in data list
  private symbolnameData: any = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'XRP': 'Ripple',
    'BCH': 'Bitcoin Cash',
    'LTC': 'Litecoin',
    'ADA': 'Cardano',
    'NEO': 'NEO',
    'XLM': 'Stellar',
    'XMR': 'Monero',
    'EOS': 'EOS',
    'IOT': 'IOTA',
    'DASH': 'Dash',
    'XEM': 'NEM',
    'TRX': 'TRON',
    'ETC': 'Eth Classic',
    'USDT': 'Tether',
    'VEN': 'VeChain',
    'QTUM': 'Qtum',
    'XRB': 'Nano',
    'LSK': 'Lisk',
    'BTG': 'Bitcoin Gold',
    'OMG': 'OmiseGo',
    'ICX': 'ICON',
    'ZEC': 'Zcash',
    'DGD': 'Digix DAO',
    'BNB': 'Binance Coin',
    'STEEM': 'Steem',
    'XVG': 'Verge',
    'STRAT': 'Stratis',
    'PPT': 'Populous',
    'BCN': 'ByteCoin',
    'WAVES': 'Waves',
    'SC': 'Siacoin',
    'SNT': 'Status',
    'RHOC': 'RChain',
    'MKR': 'Maker',
    'DOGE': 'DogeCoin',
    'BTS': 'Bitshares',
    'DCR': 'Decred',
    'AE': 'Aeternity',
    'WTC': 'Waltonchain',
    'REP': 'Augur',
    'ETN': 'Electroneum',
    'ZRX': '0x',
    'KMD': 'Komodo',
    'BTM': 'Bytom',
    'ARK': 'ARK',
    'VERI': 'Veritaseum',
    'ARDR': 'Ardor',
    'GNT': 'Golem',
    'DRGN': 'Dragonchain',
    'HSR': 'Hshare',
    'BAT': 'BAT',
    'CNX': 'Cryptonex',
    'SYS': 'SysCoin',
    'ZIL': 'Zilliqa',
    'KCS': 'KuCoin',
    'DGB': 'DigiByte',
    'BQX': 'Ethos',
    'GAS': 'Gas'
  };
  private defaultDataCopy: any = { ...this.symbolnameData };

  private priceMultiurl: string;
  private imageurlPrefix: string = "./assets/crypto-icons/";
  private imageurlSuffix: string[];
  private images: any[];

  private timer = Observable.timer(0, 150000);

  public _previousIndex: number = null;
  public _previousData: any = null;
  public _previousPageSize: number = null;
  public _previousSortMapName: string = null;
  public _previousSortMapSymbol: string = null;
  private _filterd: boolean = false;


  constructor(private _http: HttpClient) { }

  // Return filtered coin list
  filter(searchText: string): boolean {
    // Recover default data set before filter
    this.symbolnameData = this.defaultDataCopy;

    // If search text is not empty, find fuzzy match and convert to the same object structure
    if (searchText !== "") {

      let data: any[] = (JSON.stringify(this.symbolnameData)).replace(/{|}/g, '').split(',')
        .filter((el) => el.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
      //console.log(data);

      if (data.length === 0) {
        this._filterd = false;
        return false;
      }

      let arr: any[] = [];
      data.forEach(function (el) {
        let temp = el.replace(/"/g, '').split(':');
        arr.push(temp);
      });
      //console.log(arr);

      this.symbolnameData = arr.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {})
      //console.log(this.symbolnameData);
      this._filterd = true;
      return true;

    } else {
      // If search text is empty, recover from copy
      this._filterd = false;
      this.symbolnameData = this.defaultDataCopy;
      return true;
    }

  }

  // Sort data by coin name or coin symbol
  sortData(sortName: string, sortOrder: string) {
    //console.log(sortName, sortOrder, sortFilter);
    switch (sortName) {

      case "name": {
        if (sortOrder === "ascend") {
          this.symbolnameData = Object.keys(this.symbolnameData).sort().reduce((r, k) => (r[k] = this.symbolnameData[k], r), {});
        } else if (sortOrder === "descend") {
          this.symbolnameData = Object.keys(this.symbolnameData).sort((a, b) => b.localeCompare(a))
            .reduce((r, k) => (r[k] = this.symbolnameData[k], r), {});
        } else {
          if (!this._filterd) {
            this.symbolnameData = this.defaultDataCopy;
            //console.log("Use copy data");
          } else {
            this.symbolnameData = this._previousData;
            //console.log("Use previous data");
          }
        }
        //console.log(this.symbolnameData);
        break;
      }

      case "symbol": {
        if (sortOrder === "ascend") {
          this.symbolnameData = Object.keys(this.symbolnameData).sort((a, b) => this.symbolnameData[a].localeCompare(this.symbolnameData[b]))
            .reduce((r, k) => (r[k] = this.symbolnameData[k], r), {});
          // console.log(this.symbolnameData);
        } else if (sortOrder === "descend") {
          this.symbolnameData = Object.keys(this.symbolnameData).sort((a, b) => this.symbolnameData[b].localeCompare(this.symbolnameData[a]))
            .reduce((r, k) => (r[k] = this.symbolnameData[k], r), {});
        } else {
          if (!this._filterd) {
            this.symbolnameData = this.defaultDataCopy;
          } else {
            this.symbolnameData = this._previousData;
            //console.log("Use previous data");
          }
        }
        //console.log(this.symbolnameData);
        break;
      }

      case "marketCap": {
        if (sortOrder === "ascend") {
          this.symbolnameData = Object.keys(this.symbolnameData).sort((a, b) => this.symbolnameData[a].localeCompare(this.symbolnameData[b]))
            .reduce((r, k) => (r[k] = this.symbolnameData[k], r), {});
          // console.log(this.symbolnameData);
        } else if (sortOrder === "descend") {
          this.symbolnameData = Object.keys(this.symbolnameData).sort((a, b) => this.symbolnameData[b].localeCompare(this.symbolnameData[a]))
            .reduce((r, k) => (r[k] = this.symbolnameData[k], r), {});
        } else {
          if (!this._filterd) {
            this.symbolnameData = this.defaultDataCopy;
          } else {
            this.symbolnameData = this._previousData;
            //console.log("Use previous data");
          }
        }
        //console.log(this.symbolnameData);
        break;
      }

      default: {
        //console.log("sort default called");
        this.symbolnameData = this.defaultDataCopy;
      }

    }
    //console.log(this.symbolnameData);
  }

  // Keep previous table state data
  reseverState(currentIndex: number, pageSize: number, sortMapName: string, sortMapSymbol: string): void {
    this._previousIndex = currentIndex;
    this._previousPageSize = pageSize;
    this._previousSortMapName = sortMapName;
    this._previousSortMapSymbol = sortMapSymbol;
    this._previousData = { ...this.symbolnameData };
  }

  // Fetch price data every 15 seconds
  getPricesFull(): Observable<any> {
    let coinlist: string[] = Object.keys(this.symbolnameData);
    //console.log(orderedData);
    this.priceMultiurl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + coinlist.join() + "&tsyms=USD&extraParams=Cryptocurrency_Market";

    // interval is set to 15000(15s)
    return this.timer
      .flatMap(result => this.result = this._http.get(this.priceMultiurl)
        .pipe(catchError(this.handleError('getPricesFull', []))));
  }

  // Fetch single price data
  getPriceSingle(symbol: string): Observable<any> {
    return this._http.get("https://min-api.cryptocompare.com/data/price?fsym=" + symbol + "&tsyms=USD&extraParams=Cryptocurrency_Market")
      .map(result => this.result = result)
      .pipe(catchError(this.handleError('getPriceSingle', [])));
  }

  // Return map object
  getSymbolNameMap(): any[] {
    return this.symbolnameData;
  }

  // Return all coin names as arrays
  getNamesFull(): string[] {
    //console.log(Object.keys(this.sortData(this.symbolnameData, sortOrder)));
    return Object.keys(this.symbolnameData);
  }

  // Return coin name by symbol
  getNameSingle(symbol: string): string {
    return Object.keys(this.symbolnameData).find(key => this.symbolnameData[key] === symbol);
  }

  // Get all img path
  getImagesFull(): any[] {
    let coinlist: string[] = Object.keys(this.symbolnameData);
    this.images = [];

    this.imageurlSuffix = coinlist.map(res => res.toLowerCase());
    for (let symbol of this.imageurlSuffix) {
      this.images.push(this.imageurlPrefix + symbol + ".svg");
    }

    return this.images;
  }

  // Get single img path
  getImageSingle(symbol: string): string {
    return this.imageurlPrefix + symbol.toLowerCase() + ".svg"
  }

  // Fetch minute/hourly/daily price of historical data
  getHitoricalPrices(symbol: string, prefix: string, timelimit: number, aggregate: number): Observable<any> {
    //console.log(this._http.get("https://min-api.cryptocompare.com/data/" + prefix + "?fsym=" + `${symbol}` + "&tsym=USD&limit=" + timelimit + "&aggregate=" + aggregate));
    return this._http.get("https://min-api.cryptocompare.com/data/" + prefix + "?fsym=" + `${symbol}` + "&tsym=USD&limit=" + timelimit + "&aggregate=" + aggregate + "&extraParams=Cryptocurrency_Market")
      .map(result => this.result = result)
      .pipe(catchError(this.handleError(`getHitoricalPrices symbol=${symbol}`)));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Below are functions used only in testing
   */
  setCoinData(coins: any) {
    this.symbolnameData = coins;
  }
}
