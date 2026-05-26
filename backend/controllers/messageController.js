import Message from "../models/Message.js";
import sendBrevoEmail from "../utils/sendBrevoEmail.js";
import { escapeRegex, validateMessageInput } from "../utils/validators.js";

const allowedStatuses = ["new", "reviewed", "important"];
const allowedInterestTypes = [
  "General Message",
  "Volunteer",
  "Donation Interest",
  "Partnership",
  "Internship Query"
];

export const createMessage = async (req, res) => {
  try {
    const validation = validateMessageInput(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Please fix the highlighted fields",
        errors: validation.errors
      });
    }

    const { name, email, phone = "", interestType = "General Message", message } = req.body;
    const savedMessage = await Message.create({ name, email, phone, interestType, message });

    const submittedDate = new Date(savedMessage.createdAt).toLocaleString("en-IN");

    await sendBrevoEmail({
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: `New She Can Foundation Message - ${savedMessage.interestType}`,
      htmlContent: `
        <h2>New message submitted</h2>
        <p><strong>Name:</strong> ${savedMessage.name}</p>
        <p><strong>Email:</strong> ${savedMessage.email}</p>
        <p><strong>Phone:</strong> ${savedMessage.phone || "Not provided"}</p>
        <p><strong>Interest Type:</strong> ${savedMessage.interestType}</p>
        <p><strong>Message:</strong> ${savedMessage.message}</p>
        <p><strong>Submitted Date:</strong> ${submittedDate}</p>
      `
    });

    await sendBrevoEmail({
      to: savedMessage.email,
      subject: "Thank you for contacting She Can Foundation",
      htmlContent: `
        <h2>Hello ${savedMessage.name},</h2>
        <p>Thank you for contacting She Can Foundation. Your message was submitted successfully.</p>
        <p><strong>Interest Type:</strong> ${savedMessage.interestType}</p>
        <p>Our team can review your message from the demo admin dashboard.</p>
      `
    });

    return res.status(201).json({
      success: true,
      message: "Form Submitted Successfully",
      data: savedMessage
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Message submission failed", error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { status, interestType, search } = req.query;
    const query = {};

    if (status && allowedStatuses.includes(status)) {
      query.status = status;
    }

    if (interestType && allowedInterestTypes.includes(interestType)) {
      query.interestType = interestType;
    }

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      query.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { message: regex },
        { interestType: regex }
      ];
    }

    const messages = await Message.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not fetch messages", error: error.message });
  }
};

export const getMessageStats = async (req, res) => {
  try {
    const [
      totalMessages,
      newMessages,
      reviewedMessages,
      importantMessages,
      donationInterestLeads,
      volunteerLeads,
      partnershipLeads,
      internshipQueryLeads
    ] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({ status: "new" }),
      Message.countDocuments({ status: "reviewed" }),
      Message.countDocuments({ status: "important" }),
      Message.countDocuments({ interestType: "Donation Interest" }),
      Message.countDocuments({ interestType: "Volunteer" }),
      Message.countDocuments({ interestType: "Partnership" }),
      Message.countDocuments({ interestType: "Internship Query" })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalMessages,
        newMessages,
        reviewedMessages,
        importantMessages,
        donationInterestLeads,
        volunteerLeads,
        partnershipLeads,
        internshipQueryLeads
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not fetch message stats", error: error.message });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Status must be new, reviewed, or important" });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    return res.status(200).json({ success: true, data: updatedMessage });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Could not update message status", error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    return res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Could not delete message", error: error.message });
  }
};
