import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

// validation for whitespace 
const trimValidator: ValidatorFn = (control: FormControl) => {
  if (control.value.startsWith(' ')) {
    control.setValue('');
    return {
      'trimError': { value: `You couldn't insert whitespace in starting ` }
    };
  }
  return null;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  filePost: FormData; 
  formValue:FormGroup;  
  fileImageUrl: string;
  fullPath :string;
  
  control= new FormControl('', trimValidator);
  extension: string;

  constructor(
    private service:CrudService,
    private toastr:ToastrService,
    private formBuilder:FormBuilder,
    private ngxService: NgxUiLoaderService,
    ) {
    this.formBuilderControl();
  }

  ngOnInit() { 
  }

  
  get phoneNo(): any {
    return this.formValue.get('phoneNo');
  }
  
  formBuilderControl(){
    this.formValue = this.formBuilder.group({
      phoneNo:new FormControl(''), 
      fileUpload:new FormControl(''), 
    });
  }

 
  
  phoneFormat(value){
    value = value.replace(/[^0-9]/g, '');

    // add '-' after 3 digit
    if(value.length > 3){
     const newPattern = [value.slice(0, 3), '-', value.slice(3)].join('');
     value = newPattern;
    }

    // add '-' after 6 digit
    const digit = value.replace('-', '');
    if(digit.length > 6 ){
      const newPattern = [value.slice(0, 7), '-', value.slice(7)].join('');
      value = newPattern;
    }

    // remove digit if more than 10
    if(digit.length > 10){
     value = value.substr(0, digit.length);
   } 

    this.formValue.get('phoneNo').setValue(value);
  }


  uploadFile(file:File[]){    
    this.extension = file[0].name.split('.').pop();
    if(this.extension != "pdf"){
      this.toastr.error('Accept only pdf !!');
      this.formValue.get('fileUpload').setValue('');
      return ;
    }
    this.filePost = new FormData(); 
    if(file.length > 0){
      this.filePost.append('file', file[0]);      
      // this.fileUpload();   
    }

  }

  fileUpload(){
    this.ngxService.start();
    if(this.extension != 'pdf') {
      this.toastr.error('Please select pdf !!');
      return
    }
    this.service.fileUpload(this.filePost).subscribe((res)=>{
      console.log(res);
      if(res.message) this.toastr.success('File uploded');
      else this.toastr.error('File not uploaded !!');
      
      this.ngxService.stop();
    }, (error) => {
      if(error.status == 422) this.toastr.error(error.error.message)
      else this.toastr.error('Error something went wrong !!'); 
      
      this.ngxService.stop();
    })   
  }

}
