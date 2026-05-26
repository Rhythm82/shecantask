import axios from "axios";

const demoFooter =
  "<p style=\"margin-top:24px;color:#6b7280;font-size:13px;\">This email was generated from a demo internship project for She Can Foundation.</p>";

const sendBrevoEmail = async ({ to, subject, htmlContent }) => {
  if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL || !to) {
    console.log("Brevo email skipped: missing configuration");
    return;
  }

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.BREVO_SENDER_NAME || "She Can Foundation Demo",
          email: process.env.BREVO_SENDER_EMAIL
        },
        to: [{ email: to }],
        subject,
        htmlContent: `${htmlContent}${demoFooter}`
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error(`Brevo email failed: ${error.response?.data?.message || error.message}`);
  }
};

export default sendBrevoEmail;
