import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  pdfFile: File | null = null;
  chatbotResponse = '';
  question = '';
  filter = '';
  historical: any[] = [];
  responseData: any;
  selectedFile = false;

  constructor(private chatbotService: ChatbotService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.pdfFile = event.target.files[0];
  }

  upload(){
    if(this.pdfFile){
      const formData = new FormData();
      formData.append('pdf_file', this.pdfFile)
      this.chatbotService.uploadPDF(formData).subscribe((res) => {
        this.responseData = res.response;
        this.snackBar.open(res.response.mensagem || 'Currículo enviado!', 'Fechar', {
          duration: 3000
        });
      })
    }
  }


}
