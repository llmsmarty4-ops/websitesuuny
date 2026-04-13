import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { Layout } from "@/components/layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="h-full w-full flex items-center justify-center">
        <Card className="w-full max-w-md bg-card/80 border-border backdrop-blur shadow-2xl">
          <CardContent className="pt-8 pb-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6 border border-destructive/30 shadow-[0_0_15px_rgba(248,81,73,0.2)]">
              <ShieldAlert className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold text-destructive text-glow mb-2" style={{ textShadow: '0 0 8px rgba(248, 81, 73, 0.5)' }}>404</h1>
            <h2 className="text-xl text-foreground font-mono tracking-widest uppercase">Target Not Found</h2>
            <p className="mt-4 text-sm text-muted-foreground font-mono">
              The requested vector could not be located in the current workspace.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
