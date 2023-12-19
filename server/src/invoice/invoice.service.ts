import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { InvoiceServiceBase } from "./base/invoice.service.base";
import puppeteer from "puppeteer";
import fs from "fs-extra";
import path from "path";
import * as hbs from "handlebars";
import moment from "moment";

@Injectable()
export class InvoiceService extends InvoiceServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private async compile(templateName: any, data: any) {
    const filePath = path.join(
      process.cwd(),
      "src/templates",
      `${templateName}.hbs`
    );
    const html = await fs.promises.readFile(filePath, "utf-8");
    return hbs.compile(html)(data);
  }

  async generateInvoice(data: any) {
    try {
      const invoice: any = await this.invoice(data);
      // Read the image file
      const imageFile = fs.readFileSync(
        path.join(
          process.cwd(),
          "src/uploads",
          `${invoice?.user?.profileLogo || "logo-placeholder.png"}`
        )
      );
      const base64Image = Buffer.from(imageFile).toString("base64");
      const dataURL = `data:image/*;base64,${base64Image}`;
      const invoiceFormatted = {
        id: invoice.id.toString().padStart(4, "0"),
        createdAt: moment(invoice.createdAt).format("DD/MM/YYYY"),
        title: invoice.trips.listing.title,
        startDate: moment(invoice.trips.tripinfo.startDate).format(
          "DD/MM/YYYY"
        ),
        endDate: moment(invoice.trips.tripinfo.endDate).format("DD/MM/YYYY"),
        days: invoice.trips.tripinfo.days,
        priceHT: invoice.trips.tripinfo.priceHT,
        taxPrice: invoice.trips.tripinfo.taxPrice,
        price: invoice.trips.tripinfo.price,
        profileLogo: dataURL,
        adresse: invoice.user.adresse,
        fullName: invoice.user.firstName + " " + invoice.user.lastName,
      };
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const content = await this.compile("invoice-template", invoiceFormatted);
      await page.setContent(content);
      await page.emulateMediaType("screen");
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
      });
      await browser.close();
      return pdfBuffer;
    } catch (error) {
      console.log(error);
    }
  }

  /*private async sendMail(to: string, subject: string, data: any) {
    try {
      const filePath = path.join(
        process.cwd(),
        "src/documents",
        `facture-${data.id}.pdf`
      );
      // Use the MailerService to send the email
      await this.mailerService.sendMail({
        to,
        subject,
        attachments: [
          {
            path: `src/documents/facture-${data.id}.pdf`,
            filename: `facture-${data.id}.pdf`,
            contentDisposition: "attachment",
          },
        ],
      });
    } catch (error) {
      // Handle any email sending errors here
      console.error("Email sending error:", error);
    }
  }*/

  /*async createAndSend(data: any) {
    try {
      const invoice: any = await this.create(data);
      const invoiceFormatted = await this.generateInvoice(invoice);
      await this.sendMail(
        invoice.trips.user.username,
        "Facture pour votre reservation",
        invoiceFormatted
      );

      return invoice;
    } catch (error) {
      console.log(error);
      return;
    }
  }*/
}
