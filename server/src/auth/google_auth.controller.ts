import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GoogleAuthService } from "./google_auth.service";

@Controller("auth")
export class AuthGoogleController {
  constructor(private readonly googleauthService: GoogleAuthService) {}

  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
    //
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req: any, @Res() res: any) {
    console.log("request: ", res);
    res.redirect(`${process.env.FRONT_URL}?user=${JSON.stringify(req.user)}`); // Redirect to the homepage or any desired route
  }
}
