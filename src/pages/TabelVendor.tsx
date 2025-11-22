import { DashboardLayout } from "@/components/DashboardLayout";
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
import { Search, Edit, Trash2 } from "lucide-react";

const sampleData = [
  {
    namaVendor: "PT Maju Jalan",
    namaPIC: "Hasan",
    penilaian: "Baik",
  },
];

const TabelVendor = () => {
  const breadcrumbs = [
    { label: "Home" },
    { label: "Tabel Vendor" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold italic">Tabel Vendor</h1>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Vendor</label>
              <Input placeholder="Nama Vendor" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Pengadaan</label>
              <Input placeholder="Nama Pengadaan" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama PIC</label>
              <Input placeholder="Nama PIC" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status Penilaian</label>
              <Input placeholder="Status Penilaian" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Periode</label>
              <Input placeholder="Periode" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">s.d</label>
              <Input placeholder="s.d" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button className="bg-accent hover:bg-accent/90">
              <Search className="h-4 w-4 mr-2" />
              SEARCH
            </Button>
          </div>
        </Card>

        {/* Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show Entry Per page:</span>
              <Select defaultValue="6">
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Vendor</TableHead>
                  <TableHead>Nama PIC</TableHead>
                  <TableHead>Penilaian</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.namaVendor}</TableCell>
                    <TableCell>{row.namaPIC}</TableCell>
                    <TableCell>{row.penilaian}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-warning hover:bg-warning/90">
                          <Edit className="h-4 w-4 text-white" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-danger hover:bg-danger/90">
                          <Trash2 className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing Entries 1 of 1,231,324 Entries
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button size="sm" className="bg-info hover:bg-info/90">1</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TabelVendor;
