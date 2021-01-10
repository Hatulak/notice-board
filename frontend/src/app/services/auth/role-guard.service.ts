import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private jwtService: JwtService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.jwtService.getAndDecodeToken().ROLES[0]['authority'] === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
