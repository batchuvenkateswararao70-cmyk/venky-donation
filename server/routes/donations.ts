import { RequestHandler } from "express";
import crypto from "node:crypto";

export interface DonationInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  amount: number;
  currency: string;
  cause: string;
  message?: string;
  accountNumber?: string;
  ifsc?: string;
  bankName?: string;
}

export interface DonationRecord extends DonationInput {
  id: string;
  status: "initiated" | "succeeded" | "failed";
  createdAt: number;
}

const donations = new Map<string, DonationRecord>();

function encodeToken(payload: object) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}
function decodeToken<T>(token: string): T {
  return JSON.parse(Buffer.from(token, "base64url").toString("utf8")) as T;
}

export const initiateDonation: RequestHandler = (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    amount,
    currency = "USD",
    cause,
    message,
    accountNumber,
    ifsc,
    bankName,
  } = req.body as Partial<DonationInput>;

  if (!name || !email || !amount || !cause || !phone || !address) {
    console.error("Invalid initiateDonation payload:", { name, email, phone, address, amount, cause, accountNumber, ifsc, bankName });
    return res.status(400).json({ error: "Missing required fields (name, email, phone, address, amount, cause)" });
  }
  const id = crypto.randomUUID();
  const record: DonationRecord = {
    id,
    name,
    email,
    phone,
    address,
    amount: Number(amount),
    currency,
    cause,
    message,
    accountNumber,
    ifsc,
    bankName,
    status: "initiated",
    createdAt: Date.now(),
  };
  donations.set(id, record);
  const token = encodeToken({ id });
  const paymentUrl = `/mock-gateway?token=${token}`;
  res.status(200).json({ id, paymentUrl });
};

export const confirmDonation: RequestHandler = (req, res) => {
  const { token } = req.body as { token?: string };
  if (!token) return res.status(400).json({ error: "Missing token" });
  try {
    const { id } = decodeToken<{ id: string }>(token);
    const rec = donations.get(id);
    if (!rec) return res.status(404).json({ error: "Donation not found" });
    rec.status = "succeeded";
    donations.set(id, rec);
    const redirectUrl = `/donation/success?id=${encodeURIComponent(id)}`;
    res.status(200).json({ id, redirectUrl });
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export const getDonation: RequestHandler = (req, res) => {
  const { id } = req.params as { id: string };
  const rec = donations.get(id);
  if (!rec) return res.status(404).json({ error: "Not found" });
  res.status(200).json(rec);
};

export const getDonationsByEmail: RequestHandler = (req, res) => {
  const email = String(req.query.email || "").trim().toLowerCase();
  if (!email) return res.status(400).json({ error: "Email required" });
  const list = Array.from(donations.values())
    .filter((d) => d.email.toLowerCase() === email && d.status === "succeeded")
    .sort((a, b) => b.createdAt - a.createdAt);
  res.status(200).json({ donations: list });
};
