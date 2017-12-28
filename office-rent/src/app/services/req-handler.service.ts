import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Models
import { RegisterModel } from '../models/register.model';
import { LoginModel } from '../models/login.model';
import {OfferModel} from "../models/offer.model";
import {CommentModel} from "../models/comment.model";

const appKey = "kid_HJZ7bTJmz";// APP KEY HERE;
const appSecret = "91d79a4cf2494db3b3d724d82388e701"; // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

const getAllOffersUrl = `https://baas.kinvey.com/appdata/${appKey}/offers?query={}&sort={"_kmd.ect": -1}`;
const getOfferDetailsUrl = `https://baas.kinvey.com/appdata/${appKey}/offers/`;
const createOfferUrl = `https://baas.kinvey.com/appdata/${appKey}/offers`;
const createCommentUrl = `https://baas.kinvey.com/appdata/${appKey}/comments`;
const getOfferCommentsUrl = `https://baas.kinvey.com/appdata/${appKey}/comments`;

@Injectable()
export class ReqHandlerService {
  private currentAuthtoken : string;

  constructor(
    private http : HttpClient
  ) { }

  login(loginModel : LoginModel) {
    return this.http.post(
      loginUrl,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  register(registerModel : RegisterModel) : Observable<Object> {
    return this.http.post(
      registerUrl,
      JSON.stringify(registerModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  logout() {
    return this.http.post(
      logoutUrl,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  isLoggedIn() {
    let authtoken : string = localStorage.getItem('authtoken');

    return authtoken === this.currentAuthtoken;
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value : string) {
    this.currentAuthtoken = value;
  }

  private createAuthHeaders(type : string) : HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }

  getAllOffers(){
    return this.http.get(
      getAllOffersUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getOfferDetails(id){
    return this.http.get(
      getOfferDetailsUrl + `${id}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getOfferComments(id){
    return this.http.get(
      getOfferCommentsUrl + `?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  createOffer(offerModel: OfferModel) : Observable<Object>{
    return this.http.post(
      createOfferUrl,
      JSON.stringify(offerModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  createComment(commentModel: CommentModel){
    return this.http.post(
      createCommentUrl,
      JSON.stringify(commentModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }
}
