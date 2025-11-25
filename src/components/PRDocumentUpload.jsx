import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Check, X } from "lucide-react";
import { toast } from "sonner";

const documentStages = [
  {
    no: 1,
    tahapan: "DOKUMEN PR",
    documents: [
      { id: "memo-ip", name: "Memo IP" },
      { id: "kak-kuk", name: "KAK/KUK" },
      { id: "dra", name: "DRA" },
      { id: "penetapan-oe", name: "Penetapan OE" },
    ],
  },
  {
    no: 2,
    tahapan: "PERSIAPAN PENGADAAN",
    documents: [
      { id: "memo-persetujuan-sk", name: "Memo Persetujuan SK Panitia ke Direksi" },
      { id: "sk-panitia", name: "SK Panitia Pengadaan" },
      { id: "memo-persetujuan-pl", name: "Memo Persetujuan PL ke Direksi" },
    ],
  },
  {
    no: 3,
    tahapan: "SELEKSI VENDOR",
    documents: [
      { id: "memo-usulan-vendor", name: "Memo Usulan Calon Vendor" },
      { id: "konfirmasi-vendor", name: "Surat Konfirmasi Kesediaan Vendor mengikuti Pengadaan" },
      { id: "pernyataan-vendor", name: "Surat Pernyataan Calon Vendor Bersedia Mengikut Proses Pengadaan" },
      { id: "profile-vendor", name: "Company Profile Calon Vendor" },
      { id: "memo-usulan-direksi", name: "Memo Usulan Calon Vendor ke Direksi" },
    ],
  },
  {
    no: 4,
    tahapan: "SURVEY VENDOR",
    documents: [
      { id: "form-vendor", name: "Form Calon Vendor" },
      { id: "laporan-survey", name: "Laporan Hasil Survey Vendor" },
    ],
  },
  {
    no: 5,
    tahapan: "AANWIJZING/ RAPAT PENJELASAN",
    documents: [
      { id: "undangan-aanwijzing", name: "Undangan Aanwijzing" },
      { id: "berita-acara-keselahan", name: "Surat Pernyataan Keselahan" },
      { id: "berita-acara-aanwijzing", name: "Berita Acara Rapat Aanwijzing" },
    ],
  },
];

export function PRDocumentUpload({ open, onClose, prData }) {
  const [attachedDocs, setAttachedDocs] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileUpload = (docId, event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [docId]: file,
      }));
      toast.success(`File ${file.name} uploaded`);
    }
  };

  const handleSave = () => {
    toast.success("Documents saved successfully");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>PURCHASE REQUEST - {prData?.namaPengadaan}</span>
            <div className="flex gap-2">
              <Button size="sm" className="bg-success hover:bg-success/90" onClick={handleSave}>
                <Check className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" variant="destructive" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No</TableHead>
                <TableHead className="w-48">Tahapan</TableHead>
                <TableHead>Produk Dokumen</TableHead>
                <TableHead className="w-24">Attach File</TableHead>
                <TableHead className="w-64">Nama File [pdf]</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentStages.map((stage) => (
                <>
                  {stage.documents.map((doc, docIndex) => (
                    <TableRow key={doc.id}>
                      {docIndex === 0 && (
                        <TableCell rowSpan={stage.documents.length} className="font-semibold">
                          {stage.no}
                        </TableCell>
                      )}
                      {docIndex === 0 && (
                        <TableCell rowSpan={stage.documents.length} className="font-semibold">
                          {stage.tahapan}
                        </TableCell>
                      )}
                      <TableCell className="text-sm">{doc.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={attachedDocs[doc.id] || false}
                            onCheckedChange={(checked) =>
                              setAttachedDocs((prev) => ({ ...prev, [doc.id]: checked }))
                            }
                          />
                          <label htmlFor={`file-${doc.id}`} className="cursor-pointer">
                            <Upload className="h-4 w-4 text-accent" />
                          </label>
                          <input
                            id={`file-${doc.id}`}
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => handleFileUpload(doc.id, e)}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {uploadedFiles[doc.id] ? uploadedFiles[doc.id].name : "-"}
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Notes" className="text-sm" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
