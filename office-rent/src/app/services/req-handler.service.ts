import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// Models
import {RegisterModel} from '../models/register.model';
import {LoginModel} from '../models/login.model';
import {OfferModel} from "../models/offer.model";
import {CommentModel} from "../models/comment.model";
import {CategoryModel} from "../models/category.model";
import {EditProfileModel} from "../models/edit-profile.model";

const appKey = "kid_HJZ7bTJmz";// APP KEY HERE;
const appSecret = "91d79a4cf2494db3b3d724d82388e701"; // APP SECRET HERE;

// AUTH URLS
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

// GET URLS
const getAllOffersUrl = `https://baas.kinvey.com/appdata/${appKey}/offers?query={}&sort={"_kmd.ect": -1}`;
const getAllOffersByCategoryUrl = `https://baas.kinvey.com/appdata/${appKey}/offers`;
const getOffersByUsernameUrl = `https://baas.kinvey.com/appdata/${appKey}/offers`;
const getMyOffersUrl = `https://baas.kinvey.com/appdata/${appKey}/offers`;
const getOfferDetailsUrl = `https://baas.kinvey.com/appdata/${appKey}/offers/`;
const getOfferCommentsUrl = `https://baas.kinvey.com/appdata/${appKey}/comments`;
const getAllCategoriesUrl = `https://baas.kinvey.com/appdata/${appKey}/categories`;
const getUserDetailsUrl = `https://baas.kinvey.com/user/${appKey}`;

// POST URLS
const createOfferUrl = `https://baas.kinvey.com/appdata/${appKey}/offers`;
const createCommentUrl = `https://baas.kinvey.com/appdata/${appKey}/comments`;
const createCategoryUrl = `https://baas.kinvey.com/appdata/${appKey}/categories`;

// DELETE URLS
const deleteOfferUrl = `https://baas.kinvey.com/appdata/${appKey}/offers/`;
const deleteAllOfferCommentsUrl = `https://baas.kinvey.com/appdata/${appKey}/comments`;
const deleteCategoryUrl = `https://baas.kinvey.com/appdata/${appKey}/categories/`;
const deleteCommentUrl = `https://baas.kinvey.com/appdata/${appKey}/comments/`;

// PUT URLS
const editOfferUrl = `https://baas.kinvey.com/appdata/${appKey}/offers/`;
const editMyProfileUrl = `https://baas.kinvey.com/user/${appKey}/`;


@Injectable()
export class ReqHandlerService {
  private currentAuthtoken: string;

  constructor(private http: HttpClient) {
  }

  login(loginModel: LoginModel) {
    return this.http.post(
      loginUrl,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  register(registerModel: RegisterModel): Observable<Object> {
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
    let authtoken: string = localStorage.getItem('authtoken');

    return authtoken === this.currentAuthtoken;
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }

  private createAuthHeaders(type: string): HttpHeaders {
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

  getAllOffers() {
    return this.http.get(
      getAllOffersUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getAllOffersByCategory(category){
    return this.http.get(
      getAllOffersByCategoryUrl + `?query={"category":"${category}"}&sort={"_kmd.ect": -1}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getMyOffers(){
    return this.http.get(
      getMyOffersUrl + `?query={"author":"${localStorage.getItem(`username`)}"}&sort={"_kmd.ect": -1}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getOffersByUsername(username){
    return this.http.get(
      getOffersByUsernameUrl + `?query={"author":"${username}"}&sort={"_kmd.ect": 1}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getOfferDetails(id) {
    return this.http.get(
      getOfferDetailsUrl + `${id}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getOfferComments(id) {
    return this.http.get(
      getOfferCommentsUrl + `?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getAllCategories(){
    return this.http.get(
      getAllCategoriesUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getUserDetails(username){
    return this.http.get(
      getUserDetailsUrl + `?query={"username":"${username}"}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  //POST REQUESTS
  createOffer(offerModel: OfferModel): Observable<Object> {
    return this.http.post(
      createOfferUrl,
      JSON.stringify(offerModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  createComment(commentModel: CommentModel) {
    return this.http.post(
      createCommentUrl,
      JSON.stringify(commentModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  createCategory(categoryModel: CategoryModel) {
    return this.http.post(
      createCategoryUrl,
      JSON.stringify(categoryModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  //DELETE REQUESTS
  deleteOffer(id){
    return this.http.delete(
      deleteOfferUrl + id,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  deleteAllOfferComments(id){
    return this.http.delete(
      deleteAllOfferCommentsUrl + `?query={"postId":"${id}"}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  deleteCategory(id){
    return this.http.delete(
      deleteCategoryUrl + id,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  deleteComment(id){
    return this.http.delete(
      deleteCommentUrl + id,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  // PUT REQUESTS
  editOffer(offerModel: OfferModel, id){
    return this.http.put(
      editOfferUrl + id,
      JSON.stringify(offerModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  editMyProfile(editProfileModel: EditProfileModel, id){
    return this.http.put(
      editMyProfileUrl + id,
      JSON.stringify(editProfileModel),
      {
        headers:this.createAuthHeaders('Kinvey')
      }
    )
  }
}
