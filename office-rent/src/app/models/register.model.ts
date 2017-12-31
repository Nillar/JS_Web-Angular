export class RegisterModel {
  constructor(
    public username : string,
    public password : string,
    public role: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public personalInfo: string
  ) { }
}
