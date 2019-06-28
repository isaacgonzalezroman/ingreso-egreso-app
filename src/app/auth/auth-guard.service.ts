import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor( public authService: AuthService ) { }

  // canActivate es para los modulos ya precargados al inicio (Sin lazyload)
  canActivate() {
    return this.authService.isAuth();
  }

  // canLoad es para el lazyLoad de los modulos
  canLoad() {
    return this.authService.isAuth()
      .pipe(
        // take hace que solo coja la primera emision del observable
        take(1)
      );
  }

}
