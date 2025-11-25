import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface PreviewFile extends File {
  preview?: string;
  name: string;
  type: string;
}

interface DocumentPreviewProps {
  file: PreviewFile | null;
  open: boolean;
  onClose: () => void;
}

export function DocumentPreview({ file, open, onClose }: DocumentPreviewProps) {
  if (!file) return null;

  const isImage =
    file.type?.startsWith("image/") ||
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);

  const isPdf =
    file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{file.name}</span>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Download className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg min-h-[500px]">
          {isImage && file.preview && (
            <img
              src={file.preview}
              alt={file.name}
              className="max-w-full max-h-[600px] object-contain"
            />
          )}

          {isPdf && file.preview && (
            <iframe
              src={file.preview}
              className="w-full h-[600px]"
              title={file.name}
            />
          )}

          {!isImage && !isPdf && (
            <div className="text-center">
              <p className="text-muted-foreground">
                Preview not available for this file type
              </p>
              <Button className="mt-4">
                <Download className="h-4 w-4 mr-2" />
                Download to view
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
