import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesctivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as firebase from 'firebase';
import Swal from 'sweetalert2';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    public store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {

      if (fbUser) {

        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((usuarioObj: any) => {

            const user = new User(usuarioObj);
            this.store.dispatch(new SetUserAction(user));

          });

      } else {

        this.userSubscription.unsubscribe();

      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {

        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: email
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigateByUrl('');
            this.store.dispatch(new DesctivarLoadingAction());
          })
      })
      .catch(error => {
        this.store.dispatch(new DesctivarLoadingAction());
        Swal.fire('Error en el login', error.message, 'error');
      })
  }


  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.router.navigateByUrl('');
        this.store.dispatch(new DesctivarLoadingAction());
      })
      .catch(error => {
        this.store.dispatch(new DesctivarLoadingAction());
        Swal.fire('Error en el login', error.message, 'error');
      })
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {

          if (fbUser == null)
            this.router.navigateByUrl('login');

          return fbUser != null

        })
      );
  }

}
