import { interestTypes } from "../models/Message.js";

export const isValidEmail = (email = "") => /^\S+@\S+\.\S+$/.test(email.trim());

export const isValidPhone = (phone = "") => /^\d{10}$/.test(phone.trim());

export const validateMessageInput = (data) => {
  const errors = {};
  const name = data.name?.trim() || "";
  const email = data.email?.trim() || "";
  const phone = data.phone?.trim() || "";
  const interestType = data.interestType || "General Message";
  const message = data.message?.trim() || "";

  if (name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email";
  }

  if (phone && !isValidPhone(phone)) {
    errors.phone = "Phone number must be exactly 10 digits";
  }

  if (!interestTypes.includes(interestType)) {
    errors.interestType = "Please select a valid interest type";
  }

  if (message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateDonationInput = (data) => {
  const errors = {};
  const name = data.name?.trim() || "";
  const email = data.email?.trim() || "";
  const amount = Number(data.amount);

  if (!name) {
    errors.name = "Name is required";
  }

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email";
  }

  if (!Number.isFinite(amount) || amount < 1) {
    errors.amount = "Amount must be at least 1";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
