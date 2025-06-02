// components/email/EmailTemplate.tsx
import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  email: string;
  verifyCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  email,
  verifyCode,
}) => {
  return (
    <div style={{ fontFamily: "Segoe UI, Arial, sans-serif", padding: "20px", lineHeight: "1.6", backgroundColor: "#ffffff", color: "#333", maxWidth: "600px", margin: "auto", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2 style={{ color: "#007BFF", textAlign: "center" }}>
        Verify Your Account
      </h2>
      <p>Hello <strong>{username}</strong>,</p>
      <p>Thanks for signing up! Please use the verification code below to verify your account associated with <strong>{email}</strong>:</p>
      
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#007BFF",
          textAlign: "center",
          margin: "30px 0",
        }}
      >
        {verifyCode}
      </div>

      <p>If you didn’t request this, you can ignore this email.</p>
      <p style={{ marginTop: "40px", fontSize: "14px", color: "#777", textAlign: "center" }}>
        — The Dev Team
      </p>
    </div>
  );
};
