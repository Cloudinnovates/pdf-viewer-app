import { Injectable } from '@angular/core';
import pdfInfo from '../assets/data/content.json';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  public pdfName = 'loading...';
  constructor() {
    this.pdfName = pdfInfo.name;
  }


}
