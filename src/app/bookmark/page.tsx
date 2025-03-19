import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Mail, Send } from "lucide-react";

export const runtime = "edge";

export default function ComingSoon() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center text-white backdrop-blur-sm rounded-lg p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <Clock className="h-8 w-8 text-primary-foreground" />
        </div>

        {/* Main Content */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Coming Soon
          </h1>
          <p className="text-lg text-slate-600">
            Were working hard to bring you something amazing. Stay tuned!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 py-8">
          {[
            { value: "00", label: "Days" },
            { value: "00", label: "Hours" },
            { value: "00", label: "Minutes" },
            { value: "00", label: "Seconds" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl font-bold">{item.value}</span>
              <span className="text-xs text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Subscription Form */}
        <div className="space-y-2">
          <p className="text-sm text-slate-600">Get notified when we launch:</p>
          <div className="flex w-full items-center space-x-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Notify Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
