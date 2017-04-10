'use strict';

export class AuthServiceMock {

  public static CLICKER_IDS: Array<string> = ['yy5d8klsj0', 'q20iexxg4a', 'wao2xajl8a'];

  public signup(email: string, password: string): Promise<{}> {
    let rtn: string = null;
    rtn = JSON.stringify({
      usename: 'valid'
    });
    return new Promise((resolve: Function) => {
      resolve(rtn);
    });
  }

  public signin(email: string, password: string): Promise<{}> {
    let rtn: string = null;
    rtn = JSON.stringify({
      usename: 'valid'
    });
    return new Promise((resolve: Function) => {
      resolve(rtn);
    });
  }

  }
}