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
  control_button_load_faiss: boolean = false;
  control_submit_button_upload: boolean = false;

  constructor(private chatbotService: ChatbotService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.pdfFile = event.target.files[0];
  }

  upload() {
    if (this.pdfFile) {

      const formData = new FormData();
      formData.append('pdf_file', this.pdfFile)

      this.chatbotService.uploadPDF(formData).subscribe({
        next: (res) => {
          this.responseData = res.response;
          this.snackBar.open(res.response.mensagem || 'Currículo enviado!', 'Fechar', {
            duration: 7000,
          });
          this.control_submit_button_upload = true
          //  setTimeout(() => {
          //   this.control_submit_button_upload = false;
          // }, 9000);

        },
        error: (err) => {
          this.snackBar.open(err.error.mensagem || 'Erro ao enviar currículo!', 'Fechar', {
            duration: 7000
          });
          this.control_submit_button_upload = false
        }
      })
    }
  }

  loadData() {
    if (this.responseData) {
      this.chatbotService.loadData(this.responseData).subscribe({
        next: (res) => {
          this.snackBar.open(res.response.mensagem || 'Dados carregados com sucesso!', 'Fechar', { duration: 7000 });
          this.control_button_load_faiss = true;
        },
        error: (err) => {
          this.snackBar.open(err.error.mensagem || 'Erro ao carregar dados!', 'Fechar', {
            duration: 7000
          });
          this.control_button_load_faiss = false;
        }
      });
    }
  }

}
