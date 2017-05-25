import { Component } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'rm-login',
  templateUrl: 'login.component.html',

})
export class LoginComponent{

  loginForm: FormGroup;
  registerForm: FormGroup;
  formType: 'Register' | 'Login' = 'Register';

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    })
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value['email'], this.loginForm.value['password'])
      .then(a => this.router.navigate(['']))
  }
  register(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.loginForm.value['email'], this.loginForm.value['password'])
      .then(a => this.router.navigate(['']))
  }
}
