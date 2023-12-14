const nodemailer = require("nodemailer");

class EmailSender {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "fran.texido@gmail.com",
        pass: "bnpj nctf dwgk nfyh",
      },
    });
  }

  async sendMail({ to, subject, html, attachments }) {
    try {
      await this.transport.sendMail({
        from: "fran.texido@gmail.com",
        to,
        subject,
        html,
        attachments,
      });

      console.log("Correo electrónico enviado correctamente");
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
    }
  }

  closeTransport() {
    this.transport.close();
  }
}

module.exports = new EmailSender();
