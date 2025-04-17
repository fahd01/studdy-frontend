import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import QRCode from 'qrcode';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('qrCanvas') qrCanvas!: ElementRef;

  ngAfterViewInit(): void {
    const info = `Website: Studdy.tn
Email: Studdy@studdy.tn
Phone: +216 80 80 86 20
Address: 198 West 21th Street, Tunis`;

    QRCode.toCanvas(this.qrCanvas.nativeElement, info, (error: any) => {
      if (error) console.error('QR Code Error:', error);
    });
  }
}
