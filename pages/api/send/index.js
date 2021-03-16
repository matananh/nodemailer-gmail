// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
// id do cliente: 458543389651-2ad465vocn7sm48hi2l6ud4o8v4ttj6f.apps.googleusercontent.com

//chave secreta: KhCOJqtohPb2UuLRiExqbVbI

//Refresh token: 1//04ALM1Wub8Es9CgYIARAAGAQSNwF-L9IrbaEetPNWj8bCkwYOJXOLKUudukQTudvbWZLwhug-ua763zc2D4go48gTq7ga_V3-CTw

//OAuth2 Authentication

export default (req, res) => {
 
  const clientID = "458543389651-2ad465vocn7sm48hi2l6ud4o8v4ttj6f.apps.googleusercontent.com";
 const secretKey = "KhCOJqtohPb2UuLRiExqbVbI";
 const refresh_token = "1//04ALM1Wub8Es9CgYIARAAGAQSNwF-L9IrbaEetPNWj8bCkwYOJXOLKUudukQTudvbWZLwhug-ua763zc2D4go48gTq7ga_V3-CTw";
 const redirectURI = "https://developers.google.com/oauthplayground" 
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(clientID, secretKey, redirectURI);

  oauth2Client.setCredentials({
    refresh_token
  })

  const accessToken = oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    logger: false,
    debug: false,
    auth: {
      type: "OAuth2",
      user: "glauciodaniel.dev@gmail.com",
      clientId: clientID,
      clientSecret: secretKey,
      refreshToken: refresh_token,
      accessToken
    }
  });

  const mailOptions = {
    from: 'glauciodaniel.dev@gmail.com',
    to: 'glaucio@hcode.com.br',
    bcc: 'joao@hcode.com.br',
    subject: `Hcode Café: ${req.body.subject}`,
    html : `
    <h1 style='font-size:1.5em; text-align:center;'>Contato</h1>
    <p>
    <strong>Nome:</strong> ${req.body.nameContact}<br/>
    <strong>E-mail:</strong> ${req.body.emailContact}<br/>
    <strong>Assunto:</strong> ${req.body.subject}<br/>
    <strong>Mensagem:</strong> ${req.body.message}<br/> 
    </p>
    `
  }

  try {
    const result = transporter.sendMail(mailOptions);
    if(!result.reject){
      res.status(200).json({message: 'Mensagem enviada com sucesso'});
    }else {
      res.status(500).json({message: result.reject})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }


}
