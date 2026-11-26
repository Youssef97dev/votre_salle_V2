import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TripServiceBase } from "./base/trip.service.base";
import { MailerService } from "@nestjs-modules/mailer";
import * as handlebars from "handlebars";
import * as fs from "fs";

@Injectable()
export class TripService extends TripServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly mailerService: MailerService
  ) {
    super(prisma);
  }

  async createWithEmailNotification(data: any) {
    console.log(data.data.tripinfo.startDate);
    console.log(data.data.tripinfo.endDate);
    const overlappingTrips = await this.trips({
      where: {
        listingId: data.data.listing.connect.id,
        OR: [
          {
            AND: [
              {
                tripinfo: {
                  path: ["startDate"],
                  lte: new Date(data.data.tripinfo.startDate),
                },
              },
              {
                tripinfo: {
                  path: ["endDate"],
                  gt: new Date(data.data.tripinfo.startDate),
                },
              },
            ],
          },
          {
            AND: [
              {
                tripinfo: {
                  path: ["startDate"],
                  lt: new Date(data.data.tripinfo.endDate),
                },
              },
              {
                tripinfo: {
                  path: ["endDate"],
                  gt: new Date(data.data.tripinfo.endDate),
                },
              },
            ],
          },
          {
            AND: [
              {
                tripinfo: {
                  path: ["startDate"],
                  lte: new Date(data.data.tripinfo.startDate),
                },
              },
              {
                tripinfo: {
                  path: ["endDate"],
                  gte: new Date(data.data.tripinfo.endDate),
                },
              },
            ],
          },
          {
            AND: [
              {
                tripinfo: {
                  path: ["startDate"],
                  gte: new Date(data.data.tripinfo.startDate),
                },
              },
              {
                tripinfo: {
                  path: ["endDate"],
                  lte: new Date(data.data.tripinfo.endDate),
                },
              },
            ],
          },
        ],
      },
    });
    console.log("overlappingTrips: ", overlappingTrips);
    if (overlappingTrips.length > 0) {
      throw new BadRequestException({
        type: "overlap",
        fr: "Les nouvelles dates de voyage chevauchent un voyage existant.",
        en: "The new trip dates overlap with an existing trip.",
      });
    }

    // Create the reservation using the base service
    const reservation: any = await this.createTrip(data);

    // Send email notifications to the owner and client here
    // You can use an email sending library like Nodemailer.
    if (reservation?.tripinfo?.type === "reservation") {
      await this.sendEmailNotification(
        reservation.user.username,
        "Confirmation de votre réservation",
        reservation
      );
      await this.sendEmailNotificationToOwner(
        reservation.listing.listingCreatedBy.username,
        "New Reservation",
        reservation
      );
    }

    return reservation;
  }

  private async sendEmailNotification(to: string, subject: string, data: any) {
    try {
      const emailContent = await this.renderTemplate("email-template", data);
      // Use the MailerService to send the email
      await this.mailerService.sendMail({
        to,
        subject,
        html: emailContent,
      });
    } catch (error) {
      // Handle any email sending errors here
      console.error("Email sending error:", error);
    }
  }

  private async sendEmailNotificationToOwner(
    to: string,
    subject: string,
    data: any
  ) {
    try {
      const emailContent = await this.renderTemplate(
        "email-template-owner",
        data
      );
      // Use the MailerService to send the email
      await this.mailerService.sendMail({
        to,
        subject,
        html: emailContent,
      });
    } catch (error) {
      // Handle any email sending errors here
      console.error("Email sending error:", error);
    }
  }

  private async renderTemplate(
    templateName: string,
    data: any
  ): Promise<string> {
    // Load and compile the Handlebars template
    const source = await this.loadTemplate(templateName);
    const template = handlebars.compile(source);

    // Render the template with the provided data
    return template(data);
  }

  private async loadTemplate(templateName: string): Promise<string> {
    const filePath = `./src/templates/${templateName}.hbs`;
    const source = await fs.promises.readFile(filePath, "utf8");
    return source;
  }
}
