import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg: string = ""
  loginRef = new FormGroup({
    email: new FormControl(),
    pass: new FormControl(),

  })
  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  checkUser() {
    let login = this.loginRef.value;
    let obj = sessionStorage.getItem("loginInfo");
    if (login.email == "login@gmail.com" && login.pass == "12345") {
     
      this.router.navigate(["login/employees"]);
    }
    else {
      this.msg = "Invalid UserID/Password!";
    }
    this.loginRef.reset;
  }
}