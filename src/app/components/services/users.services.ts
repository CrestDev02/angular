import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class UserServices {
    constructor(private http: HttpClient){}

    // METHOD FOR API REQUEST 
    getAllUsers(){
        return this.http.get('https://jsonplaceholder.typicode.com/users');
    }
}