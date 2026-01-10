import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl rounded-3xl bg-secondary p-8 text-center md:p-12">
          <h2 className="text-xl font-bold md:text-2xl">
            Want free tools & pro tips to grow faster as a creator?
          </h2>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border bg-background px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary sm:max-w-xs"
            />
            <Button className="gap-2 rounded-full bg-primary px-6">
              <Mail className="h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
