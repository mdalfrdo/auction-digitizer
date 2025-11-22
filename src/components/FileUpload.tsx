import { useState, useCallback } from "react";
import { Upload, X, FileText, File } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onUpload?: (files: File[]) => void;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
}

export function FileUpload({ 
  onUpload, 
  maxSize = 20,
  acceptedTypes = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".zip", ".rar"]
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    
    if (file.size > maxSizeBytes) {
      toast.error(`${file.name} exceeds maximum size of ${maxSize}MB`);
      return false;
    }

    const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (acceptedTypes.length > 0 && !acceptedTypes.includes(fileExt)) {
      toast.error(`${file.name} is not an accepted file type`);
      return false;
    }

    return true;
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const validFiles: File[] = [];
    Array.from(fileList).forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      simulateUpload(validFiles);
      toast.success(`${validFiles.length} file(s) added successfully`);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const simulateUpload = (filesToUpload: File[]) => {
    filesToUpload.forEach((file) => {
      const fileName = file.name;
      let progress = 0;
      
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress((prev) => ({ ...prev, [fileName]: progress }));
        
        if (progress >= 100) {
          clearInterval(interval);
          if (onUpload) {
            onUpload([file]);
          }
        }
      }, 200);
    });
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
    toast.success("File removed");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <Card
        className={cn(
          "p-8 border-2 border-dashed transition-colors",
          isDragging ? "border-accent bg-accent/5" : "border-muted-foreground/25"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="p-4 bg-accent/10 rounded-full">
            <Upload className="h-12 w-12 text-accent" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Upload Files</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Maximum file size: {maxSize}MB | Accepted: {acceptedTypes.join(", ")}
            </p>
          </div>

          <label htmlFor="file-upload">
            <Button asChild className="bg-accent hover:bg-accent/90">
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Select Files
              </span>
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              accept={acceptedTypes.join(",")}
              onChange={handleFileInput}
            />
          </label>
        </div>
      </Card>

      {files.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Uploaded Files ({files.length})</h3>
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="p-2 bg-info/10 rounded">
                  {file.type.includes("pdf") ? (
                    <FileText className="h-5 w-5 text-info" />
                  ) : (
                    <File className="h-5 w-5 text-info" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                  
                  {uploadProgress[file.name] !== undefined && (
                    <Progress 
                      value={uploadProgress[file.name]} 
                      className="h-1 mt-2"
                    />
                  )}
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFile(file.name)}
                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
