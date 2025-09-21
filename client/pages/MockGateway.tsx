import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePaymentGateway } from "@/hooks/usePaymentGateway";

function decodeToken(token: string) {
  try {
    let b64 = token.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    return JSON.parse(atob(b64));
  } catch (e) {
    return null;
  }
}

export default function MockGateway() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const payload = useMemo(() => (token ? decodeToken(token) : null), [token]);
  const { confirm } = usePaymentGateway();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!payload) {
      // Invalid token, go home
      nav("/donate");
    }
  }, [payload, nav]);

  const pay = async () => {
    setLoading(true);
    try {
      const res = await confirm(token);
      nav(res.redirectUrl);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!payload) return null;

  return (
    <main className="container mx-auto max-w-xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Mock Payment Gateway</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This sandbox simulates a payment provider for demo purposes.
          </p>
          <div className="rounded-md border p-4 text-sm">
            <div className="flex justify-between"><span>Donation ID</span><span className="font-medium">{payload.id}</span></div>
          </div>
          <Button onClick={pay} disabled={loading} className="w-full">
            {loading ? "Processing..." : "Pay now"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
