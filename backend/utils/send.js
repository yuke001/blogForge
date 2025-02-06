import nodemailer from "nodemailer";

export async function send({ subject, to, text, html }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: 'elwin.morar@ethereal.email',
      pass: 'XKegXJRJgfjJExWKTf'
  },
  });

  await transporter.sendMail({
    from: "elwin.morar@ethereal.email",
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
}
