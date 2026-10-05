const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const { CONFIG } = require("../config");

const sendMail = async (options) => {
  if (!CONFIG.SMTP_PASSWORD || CONFIG.SMTP_PASSWORD.includes("password")) {
    console.log("Email dispatch skipped (demo / simulation mode)");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: CONFIG.SMTP_HOST,
    port: parseInt(CONFIG.SMTP_PORT || "587"),
    service: CONFIG.SMTP_SERVICE,
    auth: {
      user: CONFIG.SMTP_MAIL,
      pass: CONFIG.SMTP_PASSWORD,
    },
    connectionTimeout: 3000,
    greetingTimeout: 3000,
    socketTimeout: 3000,
  });

  const { email, subject, template, data } = options;

  // Path to email template
  const templatePath = path.join(__dirname, "../mails", template);

  // Render HTML template with EJS
  const html = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: CONFIG.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Email dispatch skipped / simulation mode:", err.message);
  }
};

module.exports = sendMail;
