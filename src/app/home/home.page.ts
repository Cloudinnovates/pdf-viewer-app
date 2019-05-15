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
    zoomSubscription: Subscription;

    pdfMarginTop = 0;
    pdfMarginLeft = 0;

    title = 'loading...';
    currentPage = null;
    pdfViewerHeight = 0;
    showContentMenu = false;
    zoom = 1;

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
        this.zoomSubscription = this.pdfService.getZoomFactor().subscribe(zoomFactor => {
            this.zoom = 1 + zoomFactor / 100;
            this.centralizePdf();
            console.log('zoom:', this.zoom);
        });
    }

    ngOnDestroy() {
        if (this.pageSubscription) {
            this.pageSubscription.unsubscribe();
        }

        if (this.zoomSubscription) {
            this.zoomSubscription.unsubscribe();
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

    centralizePdf() {
        this.pdfMarginLeft = (this.zoom - 1) * -110;
        this.pdfMarginTop = (this.zoom - 1) * -110;
    }

    onZoomIn(event) {
        this.pdfService.scaleZoomFactor(event.scale);
    }

    onZoomOut(event) {
        this.pdfService.scaleZoomFactor(event.scale);
    }
}
