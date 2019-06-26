import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor( public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(value){
    console.log(value)
    this.authService.crearUsuario(value.nombre, value.email, value.password);
  }

}
