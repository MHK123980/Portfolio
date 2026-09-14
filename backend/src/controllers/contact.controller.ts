import { Request, Response } from 'express';
import { emailService } from '../services/email.service.js';
import { ContactInput } from '../validators/schema.js';

export const handleContact = async (req: Request, res: Response): Promise<void> => {
  const data: ContactInput = req.body;

  // Anti-spam Honeypot check: If the hidden honeypot field has a value, silently reject bot
  if (data.honeypot && data.honeypot.trim() !== '') {
    console.warn('[Security] Honeypot triggered in contact form submission. Ignoring spam bot.');
    // Pretend success so bots don't learn
    res.status(200).json({
      success: true,
      message: 'Your message has been received.',
    });
    return;
  }

  try {
    await emailService.sendContactNotification(data);

    res.status(200).json({
      success: true,
      message: "Thank you! Your message has been sent successfully. I'll get back to you shortly.",
      data: {
        receivedAt: new Date().toISOString(),
        sender: data.name,
      },
    });
  } catch (error) {
    console.error('[ContactController] Error processing contact submission:', error);
    res.status(500).json({
      success: false,
      message: "We couldn't submit your message right now. Please try again or reach out directly.",
    });
  }
};
