
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

export { END_POINT } from '../../../config/api.config';
import { environment } from '../../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
export const API_BASE_URL = ``;

@Injectable({providedIn: 'root'})
export class FireBaseService {

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }

  buildReference(collection, id) {
    return this.firestore.collection(collection).doc(id).ref;
  }

  convertRecord(res) {
    try {
      if (res.data()) {
        return {
          id: res.id,
          ...res.data()
        };
      }
    } catch (e) {
      const sum = [];
      res.forEach(doc => {
        sum.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return sum;
    }
  }

  createRecord(collection, data) {
    return  this.firestore
            .collection(collection)
            .add(data);
  }

  createRecordReference(collection, key, ref, data) {
    const refer = data;
    refer[key] = this.firestore.doc(ref).ref;
    return this.firestore
            .collection(collection)
            .add(refer);
  }

  getRecord(collection, id) {
    return this.firestore.collection(collection).doc(id).get();
  }

  /*
    condition: {key, compared, value}
    order: {key, by}
  */
  listRecords(collection, condition = null, order = null) {
    let request = condition ?
      this.firestore.collection(collection).ref.where(condition.key, condition.compared, condition.value) :
      this.firestore.collection(collection).ref;
    request = order ? request.orderBy(order.key, order.by) : request;
    return request.get();
  }

  editRecord(collection, id, body) {
    return this.firestore
      .collection(collection)
      .doc(id)
      .set(body, { merge: true });
  }

  deleteRecord(collection, id) {
    return this.firestore
      .collection(collection)
      .doc(id)
      .delete();
  }
}

