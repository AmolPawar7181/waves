const mailer = require('nodemailer');
const welcome = require('./welcome_template');

require('dotenv').config();

const getEmailData = (to,name,token,template, actionData) =>{
   let data = null;
   console.log("actionData ",actionData.resetToken);
   switch(template){
      case "welcome":
        data = {
                from: 'Waves <waves.guitars.rev@gmail.com>',
                to,
                subject: `welcome to waves ${name}`,
                html: welcome
				};
      break;
      case "reset":
        data = {
                from: 'Waves <waves.guitars.rev@gmail.com>',
                to: 'fagyt@getnada.com',
                subject: 'send Test email',
                text: 'Testing waves mails',
                html: '<b>Hello guys this workd</b>'
				};
      break;
      case "reset_password":
        data = {
                from: 'Waves <waves.guitars.rev@gmail.com>',
                to: 'cinypa@getnada.com',
                subject: 'send Test email',
                text: 'Testing waves mails',
                html: `<b><a href="http://localhost:3000/reset_password/${actionData.resetToken}" >Reset password</a></b>`
				};
      break;
      default:
          data;

   }


   return data;
}

const sendEmail = (to,name,token,type,actionData) =>{
   const smtpTransport = mailer.createTransport({
	service:"Gmail",
	auth:{
		user:"waves.guitars.rev@gmail.com",
		pass:process.env.EMAIL_PASS
	}
  });

  const mail = getEmailData(to,name,token,type,actionData)

  smtpTransport.sendMail(mail, function(err, res){
  if(err){
	  console.log("err ", err)
  }else{
	console.log("Email sent")
  }
  smtpTransport.close();
})
}

module.exports = {sendEmail}