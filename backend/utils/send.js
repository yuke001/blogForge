import nodemailer from 'nodemailer'

export async function send({subject,to,text,html}){


    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'kale.hauck42@ethereal.email',
            pass: 'RTPgNrymPUrSzB7q88'
        }
    });

    await transporter.sendMail({
        from: 'kale.hauck42@ethereal.email', 
        to: to,
        subject: subject, 
        text: text,
        html: html, 
      });


}