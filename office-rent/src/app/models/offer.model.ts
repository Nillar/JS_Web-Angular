export class OfferModel {
  constructor(
    public title: string,
    public image: string,
    public address: string,
    public description: string,
    public price: number,
    public area: number,
    public sellerName: string,
    public sellerPhone: string
  ){}
}
