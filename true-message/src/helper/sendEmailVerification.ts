import { resend } from "@/lib/resend";
import { EmailTemplate } from "../../email/verificationEmailTemplate";
import { ApiResponse } from "@/type/apResponse";
import * as React from 'react';

export async function sendEmailVerification(username: string, email: string, verifyCode: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'User Verification OTP',
      react: React.createElement(EmailTemplate, {
        username,
        email,
        verifyCode,
      }),
    });



    return {
      accept: true,
      message: "Email verification sent successfully."
    };
  } catch (error) {
    console.error("Error sending email verification:", error);
    return {
      accept: false,
      message: "Failed to send email verification. Please try again later."
    };
  }
}
