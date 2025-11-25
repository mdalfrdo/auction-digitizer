import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRForm } from "@/components/PRForm";
import { PRDocumentUpload } from "@/components/PRDocumentUpload";
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
import { Search, Edit, Trash2, Plus, Upload } from "lucide-react";

const sampleData = [
  {
    no: 1,
    namaPengadaan: "Pengadaan Guardril",
    noPR: "0001",
    statusPengadaan: "Proses",
    noPRFinal: "PR-001",
    unitPemohonan: "Div. Operasi - P&P",
    tanggalOE: "15/10/2023",
    hps: "35,000,000",
    hargaNegosiasi: "32,000,000",
  },
];

const statusVariants = {
  Proses: "bg-status-process text-black",
  Selesai: "bg-status-complete text-white",
  Batal: "bg-status-cancel text-white",
};

const DokumenPR = () => {
  const [showPRForm, setShowPRForm] = useState(false);
  const [showDocUpload, setShowDocUpload] = useState(false);
  const [selectedPR, setSelectedPR] = useState(null);
  const [prData, setPrData] = useState(sampleData);

  const breadcrumbs = [
    { label: "Home" },
    { label: "Dokumen PR" },
    { label: "Listing PR" },
  ];

  const handleAddPR = () => {
    setSelectedPR(null);
    setShowPRForm(true);
  };

  const handleEditPR = (pr) => {
    setSelectedPR(pr);
    setShowPRForm(true);
  };

  const handleDocumentUpload = (pr) => {
    setSelectedPR(pr);
    setShowDocUpload(true);
  };

  const handleSubmitPR = (formData) => {
    if (selectedPR) {
      setPrData(prData.map(pr => pr.no === selectedPR.no ? { ...pr, ...formData } : pr));
    } else {
      setPrData([...prData, { no: prData.length + 1, ...formData }]);
    }
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold italic">Listing Purchase Request</h1>
            <Button onClick={handleAddPR} className="bg-success hover:bg-success/90">
              <Plus className="h-4 w-4 mr-2" />
              Add New PR
            </Button>
          </div>
          
          {/* Status Legend */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Keterangan Warna</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-6 bg-white border border-border" />
                <span className="text-sm">Status Belum Mulai</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-6 bg-status-process" />
                <span className="text-sm font-semibold">Status Proses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-6 bg-status-complete" />
                <span className="text-sm font-semibold">Status Selesai</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-6 bg-status-cancel" />
                <span className="text-sm font-semibold">Status Batal</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">No PR</label>
              <Input placeholder="No PR" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Unit Pemohonan</label>
              <Input placeholder="Unit Pemohonan" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status PR</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status PR" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="proses">Proses</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                  <SelectItem value="batal">Batal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Pengadaan</label>
              <Input placeholder="Nama Pengadaan" />
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
                  <TableHead>No</TableHead>
                  <TableHead>Nama Pengadaan</TableHead>
                  <TableHead>No PR</TableHead>
                  <TableHead>Status Pengadaan</TableHead>
                  <TableHead>No PR</TableHead>
                  <TableHead>Unit Pemohonan</TableHead>
                  <TableHead>Tanggal OE</TableHead>
                  <TableHead>HPS</TableHead>
                  <TableHead>Harga Negosiasi</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prData.map((row) => (
                  <TableRow key={row.no}>
                    <TableCell>{row.no}</TableCell>
                    <TableCell>{row.namaPengadaan}</TableCell>
                    <TableCell>{row.noPR}</TableCell>
                    <TableCell>
                      <Badge className={statusVariants[row.statusPengadaan]}>
                        {row.statusPengadaan}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.noPRFinal}</TableCell>
                    <TableCell>{row.unitPemohonan}</TableCell>
                    <TableCell>{row.tanggalOE}</TableCell>
                    <TableCell>{row.hps}</TableCell>
                    <TableCell>{row.hargaNegosiasi}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 bg-info hover:bg-info/90"
                          onClick={() => handleDocumentUpload(row)}
                        >
                          <Upload className="h-4 w-4 text-white" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 bg-warning hover:bg-warning/90"
                          onClick={() => handleEditPR(row)}
                        >
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

      <PRForm
        open={showPRForm}
        onClose={() => setShowPRForm(false)}
        onSubmit={handleSubmitPR}
        initialData={selectedPR}
      />

      <PRDocumentUpload
        open={showDocUpload}
        onClose={() => setShowDocUpload(false)}
        prData={selectedPR}
      />
    </DashboardLayout>
  );
};

export default DokumenPR;
