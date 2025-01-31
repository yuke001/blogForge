import nodemailer from 'nodemailer'

export async function send({subject,to,text,html}){


    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'nakia28@ethereal.email',
            pass: '6hdUYNgeE1nuW5af5h'
        }
    });

    await transporter.sendMail({
        from: 'nakia28@ethereal.email', 
        to: to,
        subject: subject, 
        text: text,
        html: html, 
      });


}