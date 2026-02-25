import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Users, CalendarCheck, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "We're open when you need us. Extended hours and weekend appointments available.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our doctors and staff are dedicated to providing quality care for you and your family.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description: "Book appointments online in minutes. Manage your visits from your account.",
  },
];

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Your health,{" "}
              <span className="text-primary">our priority</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Welcome to Care Clinic. We provide comprehensive medical care with a focus on comfort,
              clarity, and convenience. Book an appointment or sign in to manage your visits.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/signup">
                  Create account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/40 bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why choose us</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              We combine experienced care with modern tools so you can focus on getting better.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary/10 border border-primary/20 p-8 sm:p-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
              Ready to book your visit?
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
              Sign up for an account to book appointments, view your history, and stay on top of your health.
            </p>
            <Button size="lg" asChild className="mt-6">
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
