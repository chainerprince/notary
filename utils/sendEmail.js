
import nodemailer from 'nodemailer'

const sendEmail = async option =>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_USER,
        port:process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD  

          
        }
      });
      const message = {
          from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
          to:option.email,
          subject:option.subject,
          text:option.message
      }
  await transporter.sendMail(message);
    }

export default  sendEmail;