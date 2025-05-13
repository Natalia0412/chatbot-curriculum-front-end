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
    return this.http.post(`${this.baseUrl}/upload`, formData, {
      withCredentials: true
    });
  }

  loadData(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/carregar-dados`, payload, {
      withCredentials: true
    });
  }

  sendQuestion(payload: { pergunta: string, filtro: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat`, payload, {
      withCredentials: true
    });
  }

  getHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/chat/historico`, {
      withCredentials: true
    });
  }
}
