import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto grid gap-10 py-16 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-emerald-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Transparent, fast and secure
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Empower change with every donation
            </h1>
            <p className="text-lg text-muted-foreground">
              Donation Platform makes it simple to support causes you care about.
              Give once or monthly, track your impact in a beautiful donor dashboard.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/donate">Donate now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">View dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-xl border bg-white p-6 shadow-sm flex items-center justify-center">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F9cbf58f69ac9445bb24a9d8cb8b63ba5%2Fd8741cb2ad184c5b820f186c41d1bbe1?format=webp&width=800" alt="donation hero" className="h-full w-full object-cover rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto grid gap-6 py-14 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <HeartHandshake className="h-5 w-5 text-emerald-600" />
              Frictionless giving
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            A clean, fast checkout that works on any device so supporters can give in seconds.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Secure by design
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Your data stays safe. We never store card details and use a mock gateway here for demo.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              Insightful dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Track donations, download receipts and see the impact of your generosity.
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
