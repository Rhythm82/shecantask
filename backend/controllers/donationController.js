import crypto from "crypto";
import Razorpay from "razorpay";
import Donation from "../models/Donation.js";
import sendBrevoEmail from "../utils/sendBrevoEmail.js";
import { escapeRegex, validateDonationInput } from "../utils/validators.js";

const getRazorpayClient = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
};

export const createDonationOrder = async (req, res) => {
  try {
    const validation = validateDonationInput(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Please fix the highlighted fields",
        errors: validation.errors
      });
    }

    const razorpay = getRazorpayClient();

    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message: "Razorpay Test Mode is not configured. Please add test keys in backend .env."
      });
    }

    const { name, email } = req.body;
    const amount = Number(req.body.amount);
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `scf_demo_${Date.now()}`
    });

    const donation = await Donation.create({
      name,
      email,
      amount,
      currency: order.currency,
      razorpayOrderId: order.id,
      status: "created"
    });

    return res.status(201).json({
      success: true,
      order,
      donationId: donation._id
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not create Razorpay order", error: error.message });
  }
};

export const verifyDonationPayment = async (req, res) => {
  try {
    const { donationId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!donationId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification data is missing" });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ success: false, message: "Razorpay secret is not configured" });
    }

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ success: false, message: "Donation record not found" });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature || donation.razorpayOrderId !== razorpay_order_id) {
      donation.status = "failed";
      await donation.save();
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    donation.status = "success";
    donation.razorpayPaymentId = razorpay_payment_id;
    donation.razorpaySignature = razorpay_signature;
    await donation.save();

    await sendBrevoEmail({
      to: donation.email,
      subject: "Demo Donation Payment Successful",
      htmlContent: `
        <h2>Demo donation payment successful</h2>
        <p><strong>Name:</strong> ${donation.name}</p>
        <p><strong>Email:</strong> ${donation.email}</p>
        <p><strong>Amount:</strong> INR ${donation.amount}</p>
        <p><strong>Razorpay Payment ID:</strong> ${donation.razorpayPaymentId}</p>
        <p><strong>Status:</strong> Test Payment Successful</p>
        <p><strong>Important:</strong> This was a Razorpay Test Mode demo payment. No real donation was collected.</p>
      `
    });

    await sendBrevoEmail({
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: "New Demo Donation Received",
      htmlContent: `
        <h2>New demo donation received</h2>
        <p><strong>Name:</strong> ${donation.name}</p>
        <p><strong>Email:</strong> ${donation.email}</p>
        <p><strong>Amount:</strong> INR ${donation.amount}</p>
        <p><strong>Razorpay Payment ID:</strong> ${donation.razorpayPaymentId}</p>
        <p><strong>Date:</strong> ${new Date(donation.updatedAt).toLocaleString("en-IN")}</p>
        <p>This is test mode only. No real donation was collected.</p>
      `
    });

    return res.status(200).json({ success: true, message: "Demo Payment Successful", data: donation });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not verify payment", error: error.message });
  }
};

export const getDonations = async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = {};

    if (status && ["created", "success", "failed"].includes(status)) {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      query.$or = [
        { name: regex },
        { email: regex },
        { razorpayPaymentId: regex },
        { razorpayOrderId: regex }
      ];
    }

    const donations = await Donation.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: donations });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not fetch donations", error: error.message });
  }
};

export const getDonationStats = async (req, res) => {
  try {
    const [totalDonations, successfulDonations, createdDonations, failedDonations, amountResult] = await Promise.all([
      Donation.countDocuments(),
      Donation.countDocuments({ status: "success" }),
      Donation.countDocuments({ status: "created" }),
      Donation.countDocuments({ status: "failed" }),
      Donation.aggregate([
        { $match: { status: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ])
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalDonations,
        successfulDonations,
        createdDonations,
        failedDonations,
        totalDemoAmount: amountResult[0]?.total || 0
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not fetch donation stats", error: error.message });
  }
};
