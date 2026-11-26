import { Injectable } from "@nestjs/common";
import * as https from 'follow-redirects/http';

@Injectable()
export class SmsService {
  sendSms(): void {
    const options = {
      method: 'POST',
      hostname: '6g6vqd.api.infobip.com',
      path: '/sms/2/text/advanced',
      headers: {
        'Authorization': 'App 5bfd58e2e1c567db11d4b1713e993ca5-db3a870f-ff67-48c5-9388-123d5a38323b',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      maxRedirects: 20,
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });

      res.on('error', (error) => {
        console.error(error);
      });
    });

    const postData = JSON.stringify({
      messages: [
        {
          destinations: [{ to: '212633737851' }],
          from: 'ServiceSMS',
          text: 'Salam cava wow. Have a nice day!',
        },
      ],
    });

    console.log("dff",postData)

    req.write(postData);
    req.end();
  }
}