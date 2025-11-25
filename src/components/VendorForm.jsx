import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function VendorForm({ open, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    namaVendor: initialData?.namaVendor || "",
    kategori: initialData?.kategori || "",
    alamat: initialData?.alamat || "",
    kontak: initialData?.kontak || "",
    email: initialData?.email || "",
    npwp: initialData?.npwp || "",
    status: initialData?.status || "Aktif",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaVendor || !formData.kontak) {
      toast.error("Please fill in required fields");
      return;
    }
    onSubmit(formData);
    toast.success("Vendor saved successfully");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Add New"} Vendor</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nama Vendor *</Label>
              <Input
                value={formData.namaVendor}
                onChange={(e) => setFormData({ ...formData, namaVendor: e.target.value })}
                placeholder="Enter vendor name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Input
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                placeholder="Enter category"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Alamat</Label>
              <Textarea
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                placeholder="Enter address"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Kontak *</Label>
              <Input
                value={formData.kontak}
                onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>

            <div className="space-y-2">
              <Label>NPWP</Label>
              <Input
                value={formData.npwp}
                onChange={(e) => setFormData({ ...formData, npwp: e.target.value })}
                placeholder="Enter NPWP"
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Input
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="Status"
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
