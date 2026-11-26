import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ListingServiceBase } from "./base/listing.service.base";
import slugify from "slugify";
import {
  Prisma,
  Listing, // @ts-ignore
} from "@prisma/client";

@Injectable()
export class ListingService extends ListingServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async generateSlug(title: any) {
    let slug = slugify(title, { lower: true });

    // Check if the slug is unique
    let existingSlug = await this.listing({ where: { slug } });

    if (existingSlug) {
      // If a post with the same slug exists, handle the conflict
      slug = this.handleSlugConflict(title);
    }

    return slug;
  }

  async createListing<T extends Prisma.ListingCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListingCreateArgs>
  ): Promise<Listing> {
    let slug = await this.generateSlug(args.data.title);

    return this.prisma.listing.create<T>({
      ...args,

      data: {
        ...args.data,
        slug,
      },
    });
  }

  async updateListing<T extends Prisma.ListingUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListingUpdateArgs>
  ): Promise<Listing> {
    let slug = args.data.title && (await this.generateSlug(args.data.title));
    return this.prisma.listing.update<T>({
      ...args,

      data: {
        ...args.data,
        slug,
      },
    });
  }

  // Function to handle slug conflict
  handleSlugConflict(slug: any) {
    // You can implement your logic here to handle the conflict
    // For example, appending a counter or timestamp
    const timestamp = Date.now();
    return slugify(`${slug}-${timestamp}`, { lower: true });
  }
}
