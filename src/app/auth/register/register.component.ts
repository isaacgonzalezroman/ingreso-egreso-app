import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  cargando: boolean = false;
  subscription: Subscription;

  constructor( 
    public authService: AuthService,
    public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe( user => this.cargando = user.isLoading );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(value){
    console.log(value)
    this.authService.crearUsuario(value.nombre, value.email, value.password);
  }

}
