import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Health Street, Medical District",
    sub: "City, State 12345",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    sub: "Mon–Sat, 8 AM – 6 PM",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@careclinic.example",
    sub: "We reply within 24 hours",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri: 8:00 AM – 6:00 PM",
    sub: "Sat: 9:00 AM – 2:00 PM",
  },
];

const Contact = () => {
  return (
    <>
      <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Contact us</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Have a question or want to book a visit? Reach out by phone, email, or use the form below.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Get in touch</h2>
              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <p className="text-muted-foreground">{value}</p>
                      {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6">Send a message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="bg-background" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={4}
                    className="bg-background resize-none"
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  Send message
                </Button>
              </form>
              <p className="mt-4 text-xs text-muted-foreground">
                This is a demo form. Connect it to your backend or email service to handle submissions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
