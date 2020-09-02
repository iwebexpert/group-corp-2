class Form{
  getEmailFunc(getEmail){
    let regExpEmail = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2,6})$/i;

    console.log('getEmail', regExpEmail.test(getEmail));

    if(!regExpEmail.test(getEmail)) {
      document.querySelector('#inputEmail4').style = 'border-color: red';
      return false;
    }

    document.querySelector('#inputEmail4').style = 'border-color: null';
  }

  getPhoneFunc(getPhone){
    let valid = /^\d[\d\(\)\ -]{4,14}\d$/.test(getPhone);
    console.log(valid);
    if(!valid){
      document.querySelector('#inputPassword4').style = 'border-color: red';
      return false;
    }

    document.querySelector('#inputPassword4').style = 'border-color: null';
  }

  getAddressFunc(getAddress){
    let regExpAddress = /^[а-я]+[а-я0-9.]/i;

    console.log('getEmail', regExpAddress.test(getAddress));

    if(!regExpAddress.test(getAddress)){
       document.querySelector('#inputAddress').style = 'border-color: red';
       return false;
     }

    document.querySelector('#inputAddress').style = 'border-color: null';
  }

  getCityFunc(getCity){
    let regExpCity = /[а-я]{4}/i;

    console.log('getEmail', regExpCity.test(getCity));

    if(!regExpCity.test(getCity)){
      document.querySelector('#inputCity').style = 'border-color: red';
      return false;
    }

    document.querySelector('#inputCity').style = 'border-color: null';
  }

  getZipFunc(getZip){
    let regExpZip = /^([0-9]{4,6})/i;

    console.log('getEmail', regExpZip.test(getZip));

    if(!regExpZip.test(getZip)){
      document.querySelector('#inputZip').style = 'border-color: red';
      return false;
    }

    document.querySelector('#inputZip').style = 'border-color: null';
  }
}
