
export default class Utility {

  static setItem(key: string, value: any = '') {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key: string): any {
    let data = localStorage.getItem(key);

    try {
      if (data) {
        return JSON.parse(data);
      } else {
        return '';
      }
    } catch (err) {
      return '';
    }
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  static clearLocalStorage() {
    // localStorage.clear();
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).indexOf("CognitoIdentityServiceProvider") == -1) {
        var item = localStorage.removeItem(localStorage.key(i));
      }
    }
  }

  static getSecurePhoneNumber(phoneNumber = '') {
    return phoneNumber.replace(/(\+\d{3})\d{7}/, "$1*******")
  }


  // get age
  static getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}

