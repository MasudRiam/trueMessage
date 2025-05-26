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
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.6", backgroundColor: "#f9f9f9" }}>
      <h1 style={{ color: "#333" }}>Hello, {username}, {email}!</h1>
      <p style={{ fontSize: "16px", color: "#555" }}>
        Use the verification code below to verify your account:
      </p>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#007BFF",
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >
        {verifyCode}
      </div>
      <p style={{ marginTop: "30px", fontSize: "14px", color: "#888" }}>
        — The Dev Team
      </p>
    </div>
  );
};
