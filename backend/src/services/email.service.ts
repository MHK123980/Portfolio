import nodemailer from 'nodemailer';
import { config } from '../config/env.js';
import { ContactInput, ProjectRequestInput } from '../validators/schema.js';

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isConfigured: boolean = false;

  constructor() {
    if (config.email.host && config.email.user && config.email.password) {
      try {
        this.transporter = nodemailer.createTransport({
          host: config.email.host,
          port: config.email.port,
          secure: config.email.secure,
          auth: {
            user: config.email.user,
            pass: config.email.password,
          },
        });
        this.isConfigured = true;
        console.log('[EmailService] SMTP Transporter configured successfully.');
      } catch (err) {
        console.warn('[EmailService] Failed to initialize SMTP transporter. Using dev fallback:', err);
      }
    } else {
      console.log('[EmailService] SMTP credentials not set. Running in development mode with simulated email delivery.');
    }
  }

  public async sendContactNotification(data: ContactInput): Promise<boolean> {
    const subject = `[Portfolio Contact] ${data.subject} from ${data.name}`;
    const textContent = `
New Contact Message Received:
-----------------------------
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Date: ${new Date().toISOString()}

Message:
${data.message}
    `.trim();

    if (!this.isConfigured || !this.transporter) {
      console.log('\n================== [DEV SIMULATED EMAIL: CONTACT] ==================');
      console.log(`To: ${config.email.contactEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(textContent);
      console.log('====================================================================\n');
      return true;
    }

    try {
      await this.transporter.sendMail({
        from: `"${data.name}" <${config.email.user}>`,
        replyTo: data.email,
        to: config.email.contactEmail,
        subject,
        text: textContent,
      });
      return true;
    } catch (error) {
      console.error('[EmailService] Error sending contact email:', error);
      // Fallback log to console so message is not completely lost
      console.log('[EmailService Fallback Log] Contact Data:', JSON.stringify(data, null, 2));
      return false;
    }
  }

  public async sendProjectRequestNotification(data: ProjectRequestInput): Promise<boolean> {
    const subject = `[Project Inquiry] ${data.service}: ${data.projectTitle} (${data.fullName})`;
    const textContent = `
New Project Request Received:
-----------------------------
Client: ${data.fullName}
Email: ${data.email}
Company: ${data.company || 'N/A'}
Service: ${data.service}
Title: ${data.projectTitle}
Budget: ${data.budgetRange}
Timeline: ${data.expectedTimeline}
Reference URL: ${data.referenceUrl || 'None'}
Date: ${new Date().toISOString()}

Project Description:
${data.projectDescription}

Additional Requirements:
${data.additionalRequirements || 'None'}
    `.trim();

    if (!this.isConfigured || !this.transporter) {
      console.log('\n============== [DEV SIMULATED EMAIL: PROJECT REQUEST] =============');
      console.log(`To: ${config.email.contactEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(textContent);
      console.log('====================================================================\n');
      return true;
    }

    try {
      await this.transporter.sendMail({
        from: `"${data.fullName}" <${config.email.user}>`,
        replyTo: data.email,
        to: config.email.contactEmail,
        subject,
        text: textContent,
      });
      return true;
    } catch (error) {
      console.error('[EmailService] Error sending project request email:', error);
      console.log('[EmailService Fallback Log] Project Request Data:', JSON.stringify(data, null, 2));
      return false;
    }
  }
}

export const emailService = new EmailService();
