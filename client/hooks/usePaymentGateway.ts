import { useCallback } from "react";
import type { InitiateDonationRequest, InitiateDonationResponse } from "@shared/api";

export function usePaymentGateway() {
  const initiate = useCallback(async (input: InitiateDonationRequest) => {
    const res = await fetch("/api/donations/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    // If server returned JSON error, parse it and throw a readable Error
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err?.error || "Failed to initiate donation");
    }

    const data = (await res.json()) as InitiateDonationResponse;
    return data;
  }, []);

  const confirm = useCallback(async (token: string) => {
    const res = await fetch("/api/donations/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err?.error || "Failed to confirm donation");
    }
    return (await res.json()) as { id: string; redirectUrl: string };
  }, []);

  return { initiate, confirm };
}
