import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function Logo() {
  const [hideImg, setHideImg] = useState(false);
  useEffect(() => {
    // no-op, img onError toggles state
  }, []);
  return (
    <Link to="/" className="flex items-center gap-2">
      {!hideImg && (
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F9cbf58f69ac9445bb24a9d8cb8b63ba5%2Fb62d037d090241c0a701f5d0298d0487?format=webp&width=800"
          alt="Donation Platform logo"
          className="h-8 w-8 object-contain"
          onError={() => setHideImg(true)}
        />
      )}
      <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
        Donation Platform
      </span>
    </Link>
  );
}

export default function Header() {
  const location = useLocation();
  const isDonate = location.pathname.startsWith("/donate");
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Logo />
        <nav className="hidden gap-6 md:flex">
          <Link to="/" className="text-sm font-medium hover:text-foreground/80 text-foreground/60">Home</Link>
          <Link to="/donate" className="text-sm font-medium hover:text-foreground/80 text-foreground/60">Donate</Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-foreground/80 text-foreground/60">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant={isDonate ? "secondary" : "default"}>
            <Link to="/donate">Donate Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
