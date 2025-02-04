import nodemailer from "nodemailer";

export async function send({ subject, to, text, html }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "dortha.bogisich75@ethereal.email",
      pass: "dJuefX1stZyPGNeapn",
    },
  });

  await transporter.sendMail({
    from: "dortha.bogisich75@ethereal.email",
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
}
