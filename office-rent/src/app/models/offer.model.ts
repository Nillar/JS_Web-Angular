export class OfferModel {
  constructor(public author: string,
              public title: string,
              public image: string,
              public category: string,
              public address: string,
              public description: string,
              public price: number,
              public area: number,
              public sellerName: string,
              public sellerPhone: string) {
  }
}
