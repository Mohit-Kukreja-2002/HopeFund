import nodemailer from 'nodemailer'
import ejs from "ejs";
import path from 'path';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sendMail=async(options) =>{
    const transporter= nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:parseInt(process.env.SMTP_PORT || '587') ,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        },
    });
    const {email,subject,template,data}=options;
    // get the path to the email template file
    const templatePath=path.join(__dirname,'../server/mails',template);
    // console.log(templatePath)
    const html=await ejs.renderFile(templatePath,data);
    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:email,
        subject,
        html,
    };
    await transporter.sendMail(mailOptions);
};
export default sendMail;