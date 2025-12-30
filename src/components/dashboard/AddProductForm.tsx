import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { categories } from "@/data/products"; // Assuming categories are exported from here

interface AddProductFormProps {
  onFormSubmit: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onFormSubmit }) => {
  const { toast } = useToast();
  // Existing State
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  // States for additional fields
  const [discount, setDiscount] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !price || !category || !stock || !brand) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields like Name, Price, Category, Stock, and Brand.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your API
    console.log({
      name: productName,
      price: parseFloat(price),
      category,
      discount: discount ? parseInt(discount, 10) : null,
      stock: parseInt(stock, 10),
      brand,
      description,
      images,
    });

    toast({
      title: "Product Added",
      description: `${productName} has been successfully added.`,
    });

    // Close the dialog
    onFormSubmit();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);

    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            placeholder="e.g. 'Vintage Leather Jacket'"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            placeholder="e.g. 'BrandName'"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            placeholder="e.g. '4999'"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            type="number"
            placeholder="e.g. '100'"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            type="number"
            placeholder="e.g. '10' (Optional)"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the product details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Product Images</Label>
        <div className="relative border border-border rounded-md px-3 py-2 bg-background">
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground truncate">
              {images.length > 0 ? `${images.length} image(s) selected` : 'Choose images or drag and drop'}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="px-4 py-1.5"
            >
              Choose Images
            </Button>
          </div>
        </div>
        {imagePreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {imagePreviews.map((preview, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden bg-secondary/50 aspect-square cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-accent/50"
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-destructive text-destructive-foreground rounded-full p-1.5 transition-all duration-200 hover:bg-destructive/90"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200">
                  Image {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
        {images.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {images.length} image(s). Click on an image to remove.
          </p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Add Product</Button>
      </div>
    </form>
  );
};