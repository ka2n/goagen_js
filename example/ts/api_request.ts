// This module exports functions that give access to the goagen_js API hosted at localhost:8080.
///<reference path="api.d.ts" />
import * as v from "./api_validator";


import 'whatwg-fetch';

const scheme = 'http';
const host = 'localhost:8080';
const urlPrefix = scheme + '://' + host;

// UserCreate
// type_(string): type of user
// payload(object): payload
export function UserCreate(type_: string, payload: UserCreatePayload):Promise<any> {
  const url = urlPrefix + `/user/create/${type_}`;
  let e = undefined;
  e = v.validate(v.UserCreate.Type, type_);
  if (e) {
    return Promise.reject(e);
  }
  e = v.validate(v.UserCreate.payload, payload);
  if (e) {
    return Promise.reject(e);
  }
  return post(url, payload);
}
// UserGet
// userID(number): ID of user
// payload(object): payload
export function UserGet(userID: number):Promise<UserMedia> {
  const url = urlPrefix + `/user/${userID}`;
  let e = undefined;
  e = v.validate(v.UserGet.UserID, userID);
  if (e) {
    return Promise.reject(e);
  }
  return get(url);
}
// UserList
// payload(object): payload
export function UserList():Promise<UserTypeCollectionMedia> {
  const url = urlPrefix + `/user`;
  return get(url);
}
// helper function for GET method.
function get(url: string, payload?: any): Promise<any> {

  const query = queryBuilder(payload);
  return fetch(url + query, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

// helper function for POST method.
function post(url: string, payload?: any): Promise<any> {

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// helper functon which return QueryParameter from Object.
function queryBuilder(obj: any): string {

  if (!obj) {
    return '';
  }
  const r = Object.keys(obj).sort().map((key) => {
    const val = obj[key];
    if (val === undefined){
      return '';
    }
    if (val === null){
      return '';
    }
    return encodeURIComponent(key) + "=" + encodeURIComponent(val);
  }).filter((x) => {
    return x.length > 0;
  }).join('&');
  if (r.length > 0){
    return '?' + r;
  }
  return '';
}
