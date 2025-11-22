import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FileUpload } from "@/components/FileUpload";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import { Upload, Download, Trash2, FileText, Edit } from "lucide-react";

const sampleFiles = [
  {
    no: 1,
    file: "Daftar Pegawai.pdf",
    namaFile: "Dokumen kepegawaian seluruh pegawai termasuk pegawai tidak tetap",
    ekstensi: "Ada",
    ukuran: "2.16 Mb",
    tanggal: "29-08-2023",
  },
  {
    no: 2,
    file: "Dokumen Lelang Godung.zip",
    namaFile: "Dokumen lelang gedung lantai 4",
    ekstensi: "Ada",
    ukuran: "171.27 Kb",
    tanggal: "31-08-2023",
  },
];

const FileManager = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  const breadcrumbs = [
    { label: "Home" },
    { label: "File Manager" },
  ];

  const handleUpload = (files: File[]) => {
    console.log("Files uploaded:", files);
    // Here you would handle the actual upload to your backend
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">File Manager</h1>

        {/* File Upload Section */}
        <FileUpload onUpload={handleUpload} />

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button className="bg-info hover:bg-info/90">
            <Download className="h-4 w-4 mr-2" />
            Download Semua File
          </Button>
          <Button className="bg-danger hover:bg-danger/90">
            <Trash2 className="h-4 w-4 mr-2" />
            Hapus Semua Data
          </Button>
        </div>

        {/* Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm">entries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Search:</span>
              <Input placeholder="Search..." className="w-[200px]" />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Nama Dokumen</TableHead>
                  <TableHead>File Eksis</TableHead>
                  <TableHead>Ukuran File</TableHead>
                  <TableHead>Tgl. Upload</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleFiles.map((file) => (
                  <TableRow key={file.no}>
                    <TableCell>{file.no}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-danger" />
                        <span className="text-sm">{file.file}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">{file.namaFile}</TableCell>
                    <TableCell>
                      <Badge className="bg-success text-success-foreground">
                        {file.ekstensi}
                      </Badge>
                    </TableCell>
                    <TableCell>{file.ukuran}</TableCell>
                    <TableCell>{file.tanggal}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-info hover:bg-info/90">
                          <Download className="h-4 w-4 text-white" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-success hover:bg-success/90">
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
              Showing 1 to 9 of 9 entries
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

export default FileManager;
