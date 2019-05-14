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

  getBeforePage(currentPage: number): number {
    return currentPage === 1 ? 1 : currentPage - 1;
  }
  getNextPage(currentPage: number): number {
    return currentPage === pdfInfo.pageCount ? pdfInfo.pageCount : currentPage + 1;
  }

}
