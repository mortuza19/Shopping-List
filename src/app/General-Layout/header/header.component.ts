import { Component, OnInit} from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated : boolean = false;
  constructor(private dataStorageService: DataStorageService,private authService:AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(userData=>{
      this.isAuthenticated = !!userData;
    })
  }

  onSaveRecipies(){
    this.dataStorageService.storeRecipies();
  }

  onFetchRecipies(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
