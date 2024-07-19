import { FRONTEND_HOST } from "../constants.js";
import { transport } from "./email.js";

export function sendValidationEmail({ name, email, validationCode }) {
  transport.sendMail({
    from: "Travel Journal <no-reply@travel-journal.com>",
    to: `${name} <${email}>`,
    subject: "Welcome to TravelApp - Validate your email",
    html: `
        <html>
          <head>
          <style>
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
          </style>
          </head>
          <body>
            <h1>Welcome to TravelApp</h1>
            <p>
              Hi ${name}, welcome to TravelApp. We are glad to have you on board. Before you can start using the app, you need to validate your email.
            </p>
            <p>
              <a href="${FRONTEND_HOST}/validate-email?email=${email}&code=${validationCode}">
                Click here to validate your email
              </a>
            </p>
          </body>
        </html>
      `,
  });
}
