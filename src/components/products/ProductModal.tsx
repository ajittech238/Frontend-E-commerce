import { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import ProductDisplay from "./ProductDisplay"; // <-- Import the new shared component
import { X } from "lucide-react";

interface ProductModalProps {
  product: any; // You should replace 'any' with a proper Product type
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onOpenChange,
}: ProductModalProps) {

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="z-50 max-w-5xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-3xl border-none bg-background shadow-2xl scrollbar-hide">
        {/* The content is now entirely handled by ProductDisplay */}
        <ProductDisplay product={product} />
        
      </DialogContent>
    </Dialog>
  );
}