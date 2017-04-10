import { AuthService } from './auth';
import firebase from 'firebase';

let authService = null;

describe('AuthService Sign in Tests', () => {
  beforeEach(() => {
    authService = new AuthService();
  });

  it('There should be no active user at the beginning', () => {
    let userRaw = authService.getActiveUser();
    expect(userRaw).toBeFalsy();
  });

  let badEmail = 'user@';
  let badPassword = '1';
  let goodEmail = 'worker@gatech.edu';
  let goodPassword = 'vinhtran';
  let invalidEmail = 'worker111@gatech.edu';
  let invalidPassword = 'vinhtran111';

  it('Should get warning message when login with badly formatted email', (done) => {
    authService.signin(badEmail, goodPassword)
          .then(data => {
            done.fail(data);
          })
          .catch(error => {
            expect(error.message).toEqual('The email address is badly formatted.');
            done();
          });
  });

  it('Should get warning message when login with short password', (done) => {
    authService.signin(goodEmail, badPassword)
          .then(data => {
            done.fail(data);
          })
          .catch(error => {
            expect(error.message).toEqual('The password is invalid or the user does not have a password.');
            done();
          });
  });

  it('Should login with good email and good password', (done) => {
    authService.signin(goodEmail, goodPassword)
          .then(data => {
            expect(data).toBeTruthy();
            done();
          })
          .catch(error => {
            done.fail(error);
          });
  });

  it('Should get a warning message when login with invalid email and good password', (done) => {
    authService.signin(invalidEmail, goodPassword)
          .then(data => {
            done.fail(data);
          })
          .catch(error => {
            expect(error.message).toEqual('There is no user record corresponding to this identifier. The user may have been deleted.');
            done();
          });
  });

  it('There should be an active user by now', () => {
    let userRaw = authService.getActiveUser();
    expect(userRaw).toBeTruthy();
  });

  it('Should logout successfully', (done) => {
    authService.logout()
          .then(data => {
            expect(data).toBeUndefined();
            done();
          })
          .catch(error => {
            done.fail(error);
          });
  });
});

describe('AuthService Signup Tests', () => {
  beforeEach(() => {
    authService = new AuthService();
  });

  it('There should be no active user at the beginning', () => {
    let userRaw = authService.getActiveUser();
    expect(userRaw).toBeFalsy();
  });

  it('Should get warning message when signup with short password with length less than 6', (done) => {
    let goodEmail = 'vinhtran2222@gatech.edu';
    let badPassword = '1';
    authService.signup(goodEmail, badPassword)
          .then(data => {
            done.fail(data);
          })
          .catch(error => {
            expect(error.message).toEqual('Password should be at least 6 characters');
            done();
          });
  });

  it('Should get a warning message when signup with bad email and good password', (done) => {
    let prefix = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < 10; i++) {
        prefix += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    let goodEmail = prefix + '@gatech.';
    let goodPassword = '1234567';
    authService.signup(goodEmail, goodPassword)
          .then(data => {
            done.fail(data);
          })
          .catch(error => {
            expect(error.message).toEqual('The email address is badly formatted.');
            done();
          });
  }); 

  it('Should get warning message when signup with used email', (done) => {
    let goodEmail = 'user@gatech.edu';
    let badPassword = '112121';
    authService.signup(goodEmail, badPassword)
          .then(data => {
            done.fail(data);
          })
          .catch(error => {
            expect(error.message).toEqual('The email address is already in use by another account.');
            done();
          });
  });


  it('Should be able to sign up with good email and good password', (done) => {
    let prefix = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < 10; i++) {
        prefix += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    let goodEmail = prefix + '@gatech.edu';
    let goodPassword = '1234567';
    authService.signup(goodEmail, goodPassword)
          .then(data => {
            expect(data).toBeTruthy();
            done();
          })
          .catch(error => {
            done.fail(error);
          });
  });  

  it('There should be an active user after signing up', () => {
    let userRaw = authService.getActiveUser();
    console.log(userRaw);
    expect(userRaw).toBeTruthy();
  });


  it('Should logout successfully', (done) => {
    authService.logout()
          .then(data => {
            expect(data).toBeUndefined();
            done();
          })
          .catch(error => {
            done.fail(error);
          });
  });
});

describe('AuthService UpdateInfo Tests', () => {
  beforeEach(() => {
    authService = new AuthService();
  });

  it('There should be no active user at the beginning', () => {
    let userRaw = authService.getActiveUser();
    expect(userRaw).toBeFalsy();
  });

  it('Should login with good email and good password', (done) => {
    let goodEmail = 'user@gatech.edu';
    let goodPassword = 'vinhtran'
    authService.signin(goodEmail, goodPassword)
          .then(data => {
            expect(data).toBeTruthy();
            done();
          })
          .catch(error => {
            done.fail(error);
          });
  });

  it('Should be able to update user info correctly', (done) => {
    let newName = "Khoa Tran";
    let newRole = "Manager";

    authService.addUserInfo(newName, newRole)
          .then(data => {
            console.log(data);
            expect(data).toBeUndefined();
            let userRaw = authService.getActiveUser();
            console.log(userRaw);
            expect(userRaw).toBeTruthy();
            expect(userRaw.displayName).toEqual(newName);
            expect(userRaw.photoURL).toEqual(newRole);
            done();
          })
          .catch(error => {
            done.fail(error);
          });
  });

  it('Should logout successfully', (done) => {
    authService.logout()
          .then(data => {
            expect(data).toBeUndefined();
            done();
          })
          .catch(error => {
            done.fail(error);
          });
  });
});
