import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { InvoiceServiceBase } from "./base/invoice.service.base";
import * as path from 'path';
import * as pdf from 'html-pdf';
import * as fs from 'fs';

@Injectable()
export class InvoiceService extends InvoiceServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async generateInvoice(data: any) {
    const invoice: any = await this.findOne(data);

    const invoiceData = {
      invoiceId: invoice.id,
      customerName: 'John Doe',
      // Add more invoice data...
      totalPrice: invoice.price, // Total price example
      // Add other necessary data...
    };

    // Read the HTML invoice template
    const htmlTemplate = fs.readFileSync('../templates/invoice-template.html', 'utf-8');

    // Replace placeholders in the HTML template with actual invoice data
    const populatedHTML = htmlTemplate
      .replace('{{invoiceId}}', invoiceData.invoiceId)
      .replace('{{customerName}}', invoiceData.customerName)
      .replace('{{totalPrice}}', invoiceData.totalPrice);

    // Options for PDF generation (page size, orientation, etc.)
    const pdfOptions = { format: 'A4' }; // Customize as needed


    // Generate PDF from HTML using html-pdf
    return new Promise<string>((resolve, reject) => {
      pdf.create(populatedHTML).toFile('invoice.pdf', (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log('PDF file generated successfully');
          resolve('invoice.pdf'); // Resolve with the file name or path
        }
      });
    });
  }
}
