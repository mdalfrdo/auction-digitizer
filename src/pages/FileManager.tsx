import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FileUpload } from "@/components/FileUpload";
import { DocumentPreview } from "@/components/DocumentPreview";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Download, Trash2, FileText, Edit, Eye } from "lucide-react";
import { toast } from "sonner";

const sampleFiles = [
  {
    id: 1,
    no: 1,
    file: "Daftar Pegawai.pdf",
    namaFile: "Dokumen kepegawaian seluruh pegawai termasuk pegawai tidak tetap",
    ekstensi: "Ada",
    ukuran: "2.16 Mb",
    tanggal: "29-08-2023",
    type: "application/pdf",
  },
  {
    id: 2,
    no: 2,
    file: "Dokumen Lelang Godung.zip",
    namaFile: "Dokumen lelang gedung lantai 4",
    ekstensi: "Ada",
    ukuran: "171.27 Kb",
    tanggal: "31-08-2023",
    type: "application/zip",
  },
];

const FileManager = () => {
  const [files, setFiles] = useState(sampleFiles);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const breadcrumbs = [
    { label: "Home" },
    { label: "File Manager" },
  ];

  const handleUpload = (uploadedFiles) => {
    const newFiles = uploadedFiles.map((file, index) => ({
      id: files.length + index + 1,
      no: files.length + index + 1,
      file: file.name,
      namaFile: file.name,
      ekstensi: "Ada",
      ukuran: `${(file.size / 1024).toFixed(2)} KB`,
      tanggal: new Date().toLocaleDateString("id-ID"),
      type: file.type,
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (id) => {
    setFiles(files.filter(f => f.id !== id));
    setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
    toast.success("File deleted successfully");
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) {
      toast.error("No files selected");
      return;
    }
    setFiles(files.filter(f => !selectedFiles.includes(f.id)));
    toast.success(`${selectedFiles.length} file(s) deleted`);
    setSelectedFiles([]);
  };

  const handleBulkDownload = () => {
    if (selectedFiles.length === 0) {
      toast.error("No files selected");
      return;
    }
    toast.success(`Downloading ${selectedFiles.length} file(s)`);
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map(f => f.id));
    }
  };

  const toggleSelectFile = (id) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  const handlePreview = (file) => {
    setPreviewFile({ ...file, name: file.file });
    setShowPreview(true);
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">File Manager</h1>

        {/* File Upload Section */}
        <FileUpload onUpload={handleUpload} />

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button className="bg-info hover:bg-info/90" onClick={handleBulkDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Semua File
          </Button>
          <Button className="bg-danger hover:bg-danger/90" onClick={handleBulkDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Hapus Semua Data
          </Button>
        </div>

        {/* Table */}
        <Card className="p-6">
          {selectedFiles.length > 0 && (
            <div className="mb-4 p-3 bg-accent/10 rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedFiles.length} file(s) selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleBulkDownload} className="bg-info hover:bg-info/90">
                  <Download className="h-4 w-4 mr-2" />
                  Download Selected
                </Button>
                <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
          
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
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedFiles.length === files.length && files.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
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
                {files.map((file, index) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={() => toggleSelectFile(file.id)}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
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
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 bg-info hover:bg-info/90"
                          onClick={() => handlePreview(file)}
                        >
                          <Eye className="h-4 w-4 text-white" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-warning hover:bg-warning/90">
                          <Download className="h-4 w-4 text-white" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-success hover:bg-success/90">
                          <Edit className="h-4 w-4 text-white" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 bg-danger hover:bg-danger/90"
                          onClick={() => handleDelete(file.id)}
                        >
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
              Showing 1 to {files.length} of {files.length} entries
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button size="sm" className="bg-info hover:bg-info/90">1</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </Card>
      </div>

      <DocumentPreview
        file={previewFile}
        open={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </DashboardLayout>
  );
};

export default FileManager;
