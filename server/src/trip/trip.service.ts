import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TripServiceBase } from "./base/trip.service.base";
import { MailerService } from "@nestjs-modules/mailer";
import * as handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class TripService extends TripServiceBase {
  constructor(protected readonly prisma: PrismaService, private readonly mailerService:MailerService) {
    super(prisma);
  }

  async createWithEmailNotification(data: any) {
    // Create the reservation using the base service
    const reservation :any = await this.create(data);

    // Send email notifications to the owner and client here
    // You can use an email sending library like Nodemailer.
    await this.sendEmailNotification(reservation.user.username, 'Client Reservation Confirmation', `Your reservation at ${reservation.listing.title} from ${reservation.tripinfo.startDate} to ${reservation.tripinfo.endDate} has been confirmed.`);
    await this.sendEmailNotification(reservation.listing.listingCreatedBy.username, 'New Reservation', `You have a new reservation at ${reservation.listing.title} from ${reservation.tripinfo.startDate} to ${reservation.tripinfo.endDate}`);

    return reservation;
  }

  private async sendEmailNotification(to: string, subject: string, data: any) {
    try {
      const emailContent = await this.renderTemplate('email-template', data);
      // Use the MailerService to send the email
      await this.mailerService.sendMail({
        to,
        subject,
        html: emailContent,
      });
    } catch (error) {
      // Handle any email sending errors here
      console.error('Email sending error:', error);
    }
  }

  private async renderTemplate(templateName: string, data: any): Promise<string> {
    // Load and compile the Handlebars template
    const source = await this.loadTemplate(templateName);
    const template = handlebars.compile(source);

    // Render the template with the provided data
    return template(data);
  }

  private async loadTemplate(templateName: string): Promise<string> {
    const filePath = `./src/templates/${templateName}.hbs`;
    const source = await fs.promises.readFile(filePath, 'utf8');
    return source;
  }
}
