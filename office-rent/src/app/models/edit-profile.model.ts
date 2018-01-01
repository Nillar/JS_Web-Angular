export class EditProfileModel{
  constructor(
    public personalInfo: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    public username: string
  ){}
}
