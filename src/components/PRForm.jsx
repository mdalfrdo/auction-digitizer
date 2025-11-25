import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function PRForm({ open, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    namaPengadaan: initialData?.namaPengadaan || "",
    noPR: initialData?.noPR || "",
    statusPengadaan: initialData?.statusPengadaan || "Proses",
    noPRFinal: initialData?.noPRFinal || "",
    unitPemohonan: initialData?.unitPemohonan || "",
    tanggalOE: initialData?.tanggalOE || "",
    hps: initialData?.hps || "",
    hargaNegosiasi: initialData?.hargaNegosiasi || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaPengadaan || !formData.noPR) {
      toast.error("Please fill in required fields");
      return;
    }
    onSubmit(formData);
    toast.success("Purchase Request saved successfully");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Add New"} Purchase Request</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nama Pengadaan *</Label>
              <Input
                value={formData.namaPengadaan}
                onChange={(e) => setFormData({ ...formData, namaPengadaan: e.target.value })}
                placeholder="Enter procurement name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>No PR *</Label>
              <Input
                value={formData.noPR}
                onChange={(e) => setFormData({ ...formData, noPR: e.target.value })}
                placeholder="Enter PR number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Status Pengadaan</Label>
              <Select
                value={formData.statusPengadaan}
                onValueChange={(value) => setFormData({ ...formData, statusPengadaan: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Proses">Proses</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                  <SelectItem value="Batal">Batal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>No PR Final</Label>
              <Input
                value={formData.noPRFinal}
                onChange={(e) => setFormData({ ...formData, noPRFinal: e.target.value })}
                placeholder="Enter final PR number"
              />
            </div>

            <div className="space-y-2">
              <Label>Unit Pemohonan</Label>
              <Input
                value={formData.unitPemohonan}
                onChange={(e) => setFormData({ ...formData, unitPemohonan: e.target.value })}
                placeholder="Enter requesting unit"
              />
            </div>

            <div className="space-y-2">
              <Label>Tanggal OE</Label>
              <Input
                type="date"
                value={formData.tanggalOE}
                onChange={(e) => setFormData({ ...formData, tanggalOE: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>HPS</Label>
              <Input
                value={formData.hps}
                onChange={(e) => setFormData({ ...formData, hps: e.target.value })}
                placeholder="Enter HPS amount"
              />
            </div>

            <div className="space-y-2">
              <Label>Harga Negosiasi</Label>
              <Input
                value={formData.hargaNegosiasi}
                onChange={(e) => setFormData({ ...formData, hargaNegosiasi: e.target.value })}
                placeholder="Enter negotiation price"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
