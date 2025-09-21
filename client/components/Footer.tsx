export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 text-sm text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Donation Platform. All rights reserved.
        </p>
        <p>
          Built with care for those who care. Make a difference today.
        </p>
      </div>
    </footer>
  );
}
