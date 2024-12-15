import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
[x: string]: any;
  signup:FormGroup;
  Email: any;
  otpStatus:boolean=false;
  genratedOtp: any;
  enterdOtpStatus:boolean=false;
  otpfalseicon:boolean=false;
  FullName:any;
  // LastName:any;
  Password:any;
  User:any;
  
constructor(private route :Router,private fb :FormBuilder,private global:GlobalService){
  this.signup=this.fb.group({
    FullName:['',Validators.required],
    User:['',Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    OTP:[null],
    Password: ['', [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$&])[A-Za-z\\d@$!%*?&]{6,}$'), ]],
  })
  this.FullName=this.signup.get('FullName');
  this.User=this.signup.get('User');
  this.Email=this.signup.get('Email');
  this.Password=this.signup.get('Password')

}
ngOninit(){
  
}
get password() {
  return this.signup.get('password');
}

SignInRoute(){
    console.log("Going To Sign In Component");
this.route.navigate(['/sign-in'])
  }

  OtpSend(){
    this.Email=this.signup.get('Email')?.value
    let body={
      Email:this.signup.get('Email')?.value
    }
    console.log("Emaillllllllllllllllllllll",this.Email,"FFFFFFFFFFFFF",this.signup.get('Email')?.value);
    let url=this.global.base_path_url+"UserLogin/CreateOTP"
    this.global.PostRequest(url,body).subscribe((res:any)=>{
       console.log(res);
       if (res.status==true) {
        this.otpStatus=true;
        console.log("JJJJJJJJJ",this.otpStatus);
       }
       this.genratedOtp=res.Data.OTP
       console.log("Genrated OTP Is :",this.genratedOtp);
       

    })
  }


  onOtpInputChange(event:any){
     
      let enteredOTP=event.target.value;
      console.log("Entered OTP is",enteredOTP);
      if (this.genratedOtp==enteredOTP) {
        console.log("Entered OTP Is Correct",this.enterdOtpStatus);
        this.enterdOtpStatus=true
        console.log(this.otpStatus);
        this.otpfalseicon=false
      }
      else{
        console.log("Entered OTP Is Incorrect");
        this.enterdOtpStatus=false
        this.otpfalseicon=true
      }
      
  }


  onSubmit(){
    let url= this.global.base_path_url+"UserLogin/Register"
    let body={
      FullName:this.signup.get('FullName')?.value,
      User:this.signup.get('User')?.value,
      Email:this.signup.get('Email')?.value,
      OTP:this.signup.get('OTP')?.value,
      Password:this.signup.get('Password')?.value,
    }
     console.log("Body to be send to Register User",body);
 this.global.PostRequest(url,body).subscribe((res:any)=>{
  console.log("Responce Of After Registration",res)
 })

  }
}
