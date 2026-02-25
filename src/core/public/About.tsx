import { Stethoscope, Target, Eye, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our mission",
    description: "To provide accessible, compassionate, and high-quality healthcare to every patient who walks through our doors.",
  },
  {
    icon: Eye,
    title: "Our vision",
    description: "To be the trusted neighborhood clinic where families receive consistent care and support for all stages of life.",
  },
  {
    icon: Shield,
    title: "Our values",
    description: "Integrity, respect, and patient-first care guide everything we do. Your wellbeing is at the center of our practice.",
  },
];

const About = () => {
  return (
    <>
      <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Stethoscope className="h-12 w-12" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">About Care Clinic</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Care Clinic has been serving the community with reliable, person-centered healthcare.
                We offer general consultations, preventive care, and support for chronic conditions—
                all in a welcoming environment where you and your family can feel at ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">What we stand for</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border/60 bg-card p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our story</h2>
          <div className="prose prose-slate max-w-none text-muted-foreground">
            <p>
              Founded with a simple goal—to make quality healthcare approachable and convenient—Care Clinic
              has grown into a place where patients know they can count on consistent, respectful care.
              We use modern systems for scheduling and records so that your time with us is smooth,
              and our team is trained to listen and respond to your needs.
            </p>
            <p className="mt-4">
              Whether you need a routine check-up, follow-up for a long-term condition, or advice for
              your family, we are here to help. Get in touch or create an account to book your first
              appointment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
