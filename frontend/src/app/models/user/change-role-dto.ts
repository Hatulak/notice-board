export class ChangeRoleDto {
  constructor(
    public userId?: number,
    public username?: string,
    public newRoleName?: string) {
  }

}
