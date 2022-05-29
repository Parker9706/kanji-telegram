"use strict";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
async function sendMFA(data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  
  const firstName = 'Parker';
  const generateCode = () => {
    return Math.floor(Math.random() * (999999 - 111111) + 111111).toString();
  }
  const userCode = generateCode();
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "example@fake.com", // list of receivers
    subject: "Hello", // Subject line
    text: `Welcome to Kanji-Telegram; Here is your MFA Code`, // plain text body
    html: `<!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
    
        body {
          margin: 0;
          padding: 0;
        }
    
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
    
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
    
        p {
          line-height: inherit
        }
    
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
    
        @media (max-width:520px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
    
          .icons-inner {
            text-align: center;
          }
    
          .icons-inner td {
            margin: 0 auto;
          }
    
          .fullMobileWidth,
          .row-content {
            width: 100% !important;
          }
    
          .image_block img.big {
            width: auto !important;
          }
    
          .column .border,
          .mobile_hide {
            display: none;
          }
    
          table {
            table-layout: fixed !important;
          }
    
          .stack .column {
            width: 100%;
            display: block;
          }
    
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
    
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    
    <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
        <tbody>
          <tr>
            <td>
              <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td style="text-align:center;width:100%;">
                                    <h1 style="margin: 0; color: #393d47; direction: ltr; font-family: メイリオ, Meiryo, ＭＳ Ｐゴシック, MS PGothic, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, Osaka, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">漢字電報、ようこそ<br>Welcome to Kanji Telegram</span></h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="paragraph_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td>
                                    <div style="color:#393d47;font-size:14px;font-family:メイリオ, Meiryo, ＭＳ Ｐゴシック, MS PGothic, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, Osaka, sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0px;">
                                      <p style="margin: 0;">Hi ${firstName}! <br><br>Thank you for signing-up to use Kanji Telegram. I hope you enjoy your studies.<br><br>Your authentication code is...</p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td style="width:100%;text-align:center;">
                                    <h1 style="margin: 0; color: #393d47; font-size: 19px; font-family: メイリオ, Meiryo, ＭＳ Ｐゴシック, MS PGothic, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, Osaka, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${userCode}</span></h1>
                                  </td>
                                </tr>
                              </table>
                              <table class="paragraph_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td>
                                    <div style="color:#000000;font-size:14px;font-family:メイリオ, Meiryo, ＭＳ Ｐゴシック, MS PGothic, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, Osaka, sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0px;">
                                      <p style="margin: 0;">This code is valid for one hour. If you have not entered the code within this time, please create a new account, and a new code will be sent to you.&nbsp;<br><br>If you have any issues, please visit our FAQ page, or contact me at <a href="support@kanjitelegram.com">support@kanjitelegram.com</a><br><br>Sincerely,<br>Parker</p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td style="width:100%;padding-right:0px;padding-left:0px;">
                                    <div align="center" style="line-height:10px"><img class="fullMobileWidth big" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/812001_795906/editor_images/fly-d-QDoSGl_kYd0-unsplash.jpg" style="display: block; height: auto; border: 0; width: 500px; max-width: 100%;" width="500"></div>
                                  </td>
                                </tr>
                              </table>
                              <table class="paragraph_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td>
                                    <div style="color:#000000;font-size:12px;font-family:メイリオ, Meiryo, ＭＳ Ｐゴシック, MS PGothic, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, Osaka, sans-serif;font-weight:400;line-height:120%;text-align:center;direction:ltr;letter-spacing:0px;">
                                      <p style="margin: 0;">Image courtesy of <a href="https://unsplash.com/@flyd2069" target="_blank" style="text-decoration: underline; color: #0068a5;" rel="noopener">FLY:D</a><br>Kanji Telegram is powered by <a href="https://www.kanjiapi.dev" target="_blank" title="Kanji API" style="text-decoration: underline; color: #0068a5;" rel="noopener">Kanji API</a><br>Hosted by <a href="https://www.heroku.com" target="_blank" style="text-decoration: underline; color: #0068a5;" rel="noopener">Heroku</a><br>Created & Developed by <a href="https://parkerinnnyc.herokuapp.com/index-en.html" target="_blank" style="text-decoration: underline; color: #0068a5;" rel="noopener">Parker Hutcheson</a></p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="icons_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td style="vertical-align: middle; text-align: center;">
                                          <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                          <!--[if !vml]><!-->
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><!-- End -->
    </body>
    
    </html>`, // html body
  });

  console.log("Message sent: %s", info.messageId, 'First Name: ', firstName);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMFA().catch(console.error);

export default sendMFA;