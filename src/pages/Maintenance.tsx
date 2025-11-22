import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

const Maintenance = () => {
  const breadcrumbs = [
    { label: "Home" },
    { label: "Maintenance" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Maintenance</h1>

        <Card className="p-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-6 bg-warning/10 rounded-full">
                <Wrench className="h-24 w-24 text-warning" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold">System Maintenance</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This page is for system maintenance operations. Database optimization, 
              cache clearing, and system health checks can be performed here.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-info hover:bg-info/90">
                Check System Status
              </Button>
              <Button className="bg-warning hover:bg-warning/90">
                Clear Cache
              </Button>
              <Button className="bg-danger hover:bg-danger/90">
                Optimize Database
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Maintenance;
