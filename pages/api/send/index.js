// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const nodemailer = require('nodemailer')

export default (req, res) => {
 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'glauciodaniel.dev@gmail.com',
      pass: '4rfeAYUcwe=qw21!@'
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
