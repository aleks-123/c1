//! npm install nodemailer
import nodemailer from "nodemailer";

export default async function sendEmail(option) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io", //EMAIL_HOST
    port: 2525, //EMAIL_PORT
    auth: {
      user: "005e795b60fee2", //EMAIL_ADDRESS,
      pass: "bbbc260620b55f", //EMAIL_PASSWORD
    },
  });

  const mailOptions = {
    from: "Semos Academy <semos@academy.mk>",
    to: option.email,
    subject: option.subject,
    text: option.message,
    html: option.htmlMessage,
  };

  return transporter.sendMail(mailOptions);
}
