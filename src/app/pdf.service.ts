import { Injectable } from '@angular/core';
import pdfInfo from '../assets/data/content.json';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private firstPage = 1;
  private currentPage: BehaviorSubject<number> = new BehaviorSubject(null);
  public pdfName = 'loading...';
  constructor(private storage: Storage) {
    this.pdfName = pdfInfo.name;
    this.firstPage = 1 + pdfInfo.firstPageOffset;
    console.log(this.firstPage, pdfInfo.firstPageOffset);

    this.storage.get('lastPage').then((val) => {
      if (!!val) {
        this.currentPage.next(val);
      } else {
        this.currentPage.next(this.firstPage);
      }
    });
  }

  beforePage(currentPage: number) {
    const page = currentPage === this.firstPage ? this.firstPage : currentPage - 1;
    this.setCurrentPage(page);
  }

  nextPage(currentPage: number) {
    const page = currentPage === pdfInfo.pageCount ? pdfInfo.pageCount : currentPage + 1;
    this.setCurrentPage(page);
  }

  setCurrentPage(v: number) {
    this.currentPage.next(v);
    this.storage.set('lastPage', v);
  }

  getCurrentPage() {
    return this.currentPage.asObservable();
  }

  getContentPages(): IPdfPage[] {
    return (pdfInfo.pages as any).filter(x => x.showOnMenu);
  }
}



export interface IPdfPage {
  pageNumber: number;
  title: string;
  description: string;
  group: PdfPageGroup;
  showOnMenu: boolean;
}

export enum PdfPageGroup {

}