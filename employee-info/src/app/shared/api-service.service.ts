import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  baseUrl : string = environment.baseUrl;
  
  postEmployees(data:any){
    return this.http.post<any>(this.baseUrl+'/employees',data);
  }
  getAllEmployees(){
    return this.http.get<any>(this.baseUrl+'/employees');
  }
  deleteEmployees(id:any){
    return this.http.delete<any>(this.baseUrl+'/employees/'+id);
  }
  updateEmployees(data:any, id:number){
    return this.http.put<any>(this.baseUrl+'/employees/'+id,data);
  }
}
