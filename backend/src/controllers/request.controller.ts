import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { emailService } from '../services/email.service.js';
import { ProjectRequestInput } from '../validators/schema.js';

// --- Public Client Inquiries ---

export const handlePublicProjectRequest = async (req: Request, res: Response): Promise<void> => {
  const data: ProjectRequestInput = req.body;

  // Anti-spam Honeypot check
  if (data.honeypot && data.honeypot.trim() !== '') {
    console.warn('[Security] Honeypot triggered in project request form. Silently rejecting bot.');
    res.status(200).json({
      success: true,
      message: 'Project request received.',
    });
    return;
  }

  try {
    // 1. Save to authoritative database FIRST (guarantees inquiry is saved even if email fails)
    const savedRequest = dbService.createRequest({
      fullName: data.fullName,
      email: data.email,
      company: data.company,
      service: data.service,
      projectTitle: data.projectTitle,
      projectDescription: data.projectDescription,
      budgetRange: data.budgetRange,
      expectedTimeline: data.expectedTimeline,
      referenceUrl: data.referenceUrl,
      additionalRequirements: data.additionalRequirements,
    });

    // 2. Dispatch email notification asynchronously
    emailService.sendProjectRequestNotification(data).catch((err) => {
      console.warn('[EmailService] Notification failed but request is saved in DB:', err);
    });

    res.status(201).json({
      success: true,
      message:
        "Project request received. Thanks for reaching out! Your project details have been submitted successfully. I'll review the requirements and get back to you within 24–48 hours.",
      data: {
        id: savedRequest.id,
        receivedAt: savedRequest.createdAt,
        client: savedRequest.fullName,
        service: savedRequest.service,
        projectTitle: savedRequest.projectTitle,
      },
    });
  } catch (error) {
    console.error('[RequestController] Error processing project request:', error);
    res.status(500).json({
      success: false,
      message: "We couldn't submit your project request right now. Please try again or reach out directly.",
    });
  }
};

// --- Admin Request Management ---

export const adminGetAllRequests = (_req: Request, res: Response): void => {
  const requests = dbService.getAllRequests();
  res.status(200).json({
    success: true,
    count: requests.length,
    data: requests,
  });
};

export const adminGetRequestById = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const request = dbService.getRequestById(id);

  if (!request) {
    res.status(404).json({
      success: false,
      message: 'Inquiry not found.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: request,
  });
};

export const adminUpdateRequestStatus = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const { status } = req.body;

  const updated = dbService.updateRequestStatus(id, status);

  if (!updated) {
    res.status(404).json({
      success: false,
      message: 'Inquiry not found.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: `Inquiry status updated to ${status}.`,
    data: updated,
  });
};

export const adminUpdateRequestNotes = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const { adminNotes } = req.body;

  const updated = dbService.updateRequestNotes(id, adminNotes);

  if (!updated) {
    res.status(404).json({
      success: false,
      message: 'Inquiry not found.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Admin notes saved successfully.',
    data: updated,
  });
};
