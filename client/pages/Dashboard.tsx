import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DonationsByEmailResponse } from "@shared/api";

export default function Dashboard() {
  const [params, setParams] = useSearchParams();
  const initialEmail = params.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [rows, setRows] = useState<DonationsByEmailResponse["donations"]>([]);
  const [loading, setLoading] = useState(false);

  const canFetch = useMemo(() => /.+@.+\..+/.test(email), [email]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/donations?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = (await res.json()) as DonationsByEmailResponse;
        setRows(data.donations);
      } else {
        setRows([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canFetch) fetchDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParams((p) => {
      p.set("email", email);
      return p;
    });
    if (canFetch) fetchDonations();
  };

  return (
    <main className="container mx-auto py-12">
      <div className="grid gap-6 md:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Your donations</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <Button type="submit" disabled={!canFetch || loading}>{loading ? "Loading..." : "Load donations"}</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardContent>
            {rows.length === 0 ? (
              <p className="text-sm text-muted-foreground">No donations found yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Amount</th>
                      <th className="px-3 py-2">Currency</th>
                      <th className="px-3 py-2">Cause</th>
                      <th className="px-3 py-2">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((d) => (
                      <tr key={d.id} className="border-t">
                        <td className="px-3 py-2">{new Date(d.createdAt).toLocaleString()}</td>
                        <td className="px-3 py-2 font-medium">{d.amount.toFixed(2)}</td>
                        <td className="px-3 py-2">{d.currency}</td>
                        <td className="px-3 py-2">{d.cause}</td>
                        <td className="px-3 py-2">
                          <a className="text-primary underline" href={`/donation/success?id=${encodeURIComponent(d.id)}`}>View</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
