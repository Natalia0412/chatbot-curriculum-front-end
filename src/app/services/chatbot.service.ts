import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  uploadPDF(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  loadData(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/carregar-dados`, payload);
  }

  sendQuestion(payload: { pergunta: string, filtro: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat`, payload);
  }

  getHistory():Observable<any>{
    return this.http.get(`${this.baseUrl}/chat/historico`);
  }
}
