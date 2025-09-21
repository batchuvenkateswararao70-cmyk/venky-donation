import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePaymentGateway } from "@/hooks/usePaymentGateway";
import { useNavigate } from "react-router-dom";

export default function Donate() {
  const { initiate } = usePaymentGateway();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    amount: "50",
    currency: "USD",
    cause: "General Fund",
    message: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    const required = ["name", "email", "phone", "address", "amount", "cause"] as const;
    const missing = required.filter((k) => !(form[k] && String(form[k]).trim()));
    if (missing.length) {
      alert("Please fill required fields: " + missing.join(", "));
      return;
    }

    setLoading(true);
    try {
      const data = await initiate({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        amount: Number(form.amount),
        currency: form.currency,
        cause: form.cause.trim(),
        message: form.message.trim() || undefined,
        accountNumber: form.accountNumber.trim() || undefined,
        ifsc: form.ifsc.trim() || undefined,
        bankName: form.bankName.trim() || undefined,
      });
      navigate(data.paymentUrl);
    } catch (err) {
      console.error("Initiate donation failed:", err);
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-12">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Make a donation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required value={form.name} onChange={onChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required value={form.email} onChange={onChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" name="phone" type="tel" required value={form.phone} onChange={onChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" required value={form.address} onChange={onChange} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" name="amount" type="number" min={1} step={1} required value={form.amount} onChange={onChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" name="currency" value={form.currency} onChange={onChange} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cause">Cause</Label>
                <Input id="cause" name="cause" value={form.cause} onChange={onChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="accountNumber">Bank account number</Label>
                <Input id="accountNumber" name="accountNumber" value={form.accountNumber} onChange={onChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ifsc">IFSC</Label>
                  <Input id="ifsc" name="ifsc" value={form.ifsc} onChange={onChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bankName">Bank name</Label>
                  <Input id="bankName" name="bankName" value={form.bankName} onChange={onChange} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Message (optional)</Label>
                <Input id="message" name="message" value={form.message} onChange={onChange} />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Continue to payment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
