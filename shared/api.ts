/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Donation types
export interface InitiateDonationRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  amount: number;
  currency: string;
  cause: string;
  message?: string;
  // Bank details (for manual transfers / records)
  accountNumber?: string;
  ifsc?: string;
  bankName?: string;
}

export interface InitiateDonationResponse {
  id: string;
  paymentUrl: string; // internal mock gateway url
}

export interface ConfirmDonationRequest {
  token: string; // token provided by initiate -> via query param
}

export interface DonationRecord extends InitiateDonationRequest {
  id: string;
  status: "initiated" | "succeeded" | "failed";
  createdAt: number; // ms epoch
}

export interface DonationsByEmailResponse {
  donations: DonationRecord[];
}
