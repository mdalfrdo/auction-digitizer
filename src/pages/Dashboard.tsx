import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { QuickActionCard } from "@/components/QuickActionCard";
import { DocumentChart } from "@/components/DocumentChart";
import { CategoryChart } from "@/components/CategoryChart";
import { StatusChart } from "@/components/StatusChart";
import { FileText, HardDrive, FolderOpen, Plus, Database, Download, Wrench, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const breadcrumbs = [
    { label: "Home" },
    { label: "Dashboard" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Dokumen"
            value="92"
            subtitle="Pada 25/10/2023"
            icon={FileText}
            variant="blue"
          />
          <StatsCard
            title="Total Size"
            value="10 MB"
            subtitle="File Size Dokumen"
            icon={HardDrive}
            variant="green"
          />
          <StatsCard
            title="Total Kategori"
            value="2"
            subtitle="Kategori Digunakan"
            icon={FolderOpen}
            variant="orange"
          />
          <StatsCard
            title="Tambah Arsip"
            value=""
            subtitle="Tambah Arsip Dokumen Digital"
            icon={Plus}
            variant="red"
          />
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DocumentChart />
          <CategoryChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dokumen PR Table */}
          <Card className="lg:col-span-2 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Dokumen PR</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      <SelectItem value="pr">Purchase Request</SelectItem>
                      <SelectItem value="po">Purchase Order</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search:" className="w-[200px]" />
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Tgl. Upload</TableHead>
                      <TableHead>File</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No data available
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>

          {/* Status Chart */}
          <StatusChart />
        </div>

        {/* Quick Menu */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickActionCard
              title="Backup Database"
              icon={Database}
              variant="blue"
            />
            <QuickActionCard
              title="Backup Dokumen"
              icon={Download}
              variant="green"
            />
            <QuickActionCard
              title="Maintenance"
              icon={Wrench}
              variant="red"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
