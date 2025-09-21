import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DonationRecord } from "@shared/api";

export default function DonationSuccess() {
  const [params] = useSearchParams();
  const id = params.get("id") || "";
  const [donation, setDonation] = useState<DonationRecord | null>(null);

  useEffect(() => {
    const run = async () => {
      const res = await fetch(`/api/donations/${encodeURIComponent(id)}`);
      if (res.ok) setDonation((await res.json()) as DonationRecord);
    };
    if (id) run();
  }, [id]);

  if (!donation) return null;

  const mask = (value?: string) => {
    if (!value) return "-";
    if (value.length <= 4) return "****" + value;
    return "****" + value.slice(-4);
  };

  return (
    <main className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Thank you for your donation!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-muted-foreground">Name</div>
            <div className="font-medium">{donation.name}</div>

            <div className="text-muted-foreground">Email</div>
            <div className="font-medium">{donation.email}</div>

            <div className="text-muted-foreground">Phone</div>
            <div className="font-medium">{donation.phone || "-"}</div>

            <div className="text-muted-foreground">Address</div>
            <div className="font-medium">{donation.address || "-"}</div>

            <div className="text-muted-foreground">Amount</div>
            <div className="font-medium">{donation.currency} {donation.amount.toFixed(2)}</div>

            <div className="text-muted-foreground">Cause</div>
            <div className="font-medium">{donation.cause}</div>

            <div className="text-muted-foreground">Bank</div>
            <div className="font-medium">{donation.bankName || "-"} ({donation.ifsc || "-"})</div>

            <div className="text-muted-foreground">Account</div>
            <div className="font-mono">{mask(donation.accountNumber)}</div>

            <div className="text-muted-foreground">Donation ID</div>
            <div className="font-mono">{donation.id}</div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link to={`/dashboard?email=${encodeURIComponent(donation.email)}`}>View in dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/donate">Donate again</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
