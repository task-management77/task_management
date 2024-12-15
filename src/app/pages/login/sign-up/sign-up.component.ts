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
  signup:FormGroup;
  Email: any;
  otpStatus:boolean=false;
  genratedOtp: any;
  enterdOtpStatus:boolean=false;
  otpfalseicon:boolean=false;

  
constructor(private route :Router,private fb :FormBuilder,private global:GlobalService){
  this.signup=this.fb.group({
    FirstName:['',Validators.required],
    LastName:['',Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    OTP:[null],
    Password: ['', [Validators.required, Validators.minLength(6),Validators.pattern('[a-zA-Z0-9]*$')]],
  })
}
ngOninit(){
  
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

  }
}
