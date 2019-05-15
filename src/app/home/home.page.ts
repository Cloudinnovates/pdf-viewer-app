import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PdfService, IPdfPage } from '../pdf.service';
import { Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { ZoomMenuComponent } from '../zoom-menu/zoom-menu.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    animations: [
        trigger('contentMenu', [
            state('show', style({ transform: 'translateX(0)', opacity: 1 })),
            state('hide', style({ transform: 'translateX(100%)', opacity: 0 })),
            transition('* => *', animate(500))
        ])
    ]
})
export class HomePage implements OnInit, OnDestroy {
    @ViewChild('pdf_viewer') pdf_viewer;
    pageSubscription: Subscription;

    title = 'loading...';
    currentPage = null;
    pdfViewerHeight = 0;
    showContentMenu = false;

    constructor(
        private pdfService: PdfService,
        private popoverController: PopoverController
    ) { }

    ngOnInit() {
        this.title = this.pdfService.pdfName;
        this.pageSubscription = this.pdfService.getCurrentPage().subscribe(page => {
            if (!!page) {
                this.currentPage = page;
                console.log('currentPage:', this.currentPage);
            }
        });
    }

    ngOnDestroy() {
        if (this.pageSubscription) {
            this.pageSubscription.unsubscribe();
        }
    }

    onSwipeRight() {
        this.pdfService.beforePage(this.currentPage);
    }

    onSwipeLeft() {
        this.pdfService.nextPage(this.currentPage);
    }

    pageRendered() {
        this.pdfViewerHeight = this.pdf_viewer.element.nativeElement.scrollHeight;
    }

    onToggleContentMenu() {
        this.showContentMenu = !this.showContentMenu;
        this.title = this.showContentMenu ? 'Menu' : this.pdfService.pdfName;
    }

    onPageClick(page: IPdfPage) {
        this.pdfService.goPage(page);
        this.onToggleContentMenu();
    }

    async onShowZoomMenu(ev) {
        const popover = await this.popoverController.create({
            component: ZoomMenuComponent,
            event: ev,
            translucent: true
        });
        await popover.present();
    }
}
