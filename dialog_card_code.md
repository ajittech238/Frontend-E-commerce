Here's the code for a "View Products" dialog card, which you can integrate into your `AdminCategories.tsx` file.

First, you'll need to add some state variables in your `AdminCategories` component:

```typescript
// ... inside your AdminCategories component function
const [isViewProductsDialogOpen, setIsViewProductsDialogOpen] = useState(false);
const [viewingCategory, setViewingCategory] = useState<any>(null);

// Placeholder for product data - replace with actual product fetching logic
const mockProducts = [
  { id: "p1", name: "Smartphone X", categoryId: "1", price: 699, stock: 120 },
  { id: "p2", name: "Laptop Pro", categoryId: "1", price: 1200, stock: 50 },
  { id: "p3", name: "Vintage Dress", categoryId: "2", price: 85, stock: 75 },
  { id: "p4", name: "Gaming Headset", categoryId: "1", price: 99, stock: 200 },
  { id: "p5", name: "Smart Watch", categoryId: "1", price: 250, stock: 90 },
  { id: "p6", name: "Men's T-Shirt", categoryId: "2", price: 25, stock: 300 },
];

const getProductsForCategory = (categoryId: string) => {
  return mockProducts.filter(product => product.categoryId === categoryId);
};
```

Next, modify the `columns` array to add an `onClick` handler to the "View Products" `DropdownMenuItem`:

```typescript
// ... inside your columns array definition
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setViewingCategory(item); setIsViewProductsDialogOpen(true); }}>
              <Eye className="w-4 h-4 mr-2" /> View Products
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
```

Finally, add the new `Dialog` component at the end of your `return` statement, after your existing category editing dialog:

```typescript
// ... after your existing <Dialog> for editing categories
      <Dialog open={isViewProductsDialogOpen} onOpenChange={setIsViewProductsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <DialogHeader>
            <DialogTitle>Products in {viewingCategory?.name}</DialogTitle>
            <DialogDescription>
              Viewing products for the category: {viewingCategory?.name} ({viewingCategory?.id})
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {viewingCategory && getProductsForCategory(viewingCategory.id).length > 0 ? (
              <div className="space-y-3">
                {getProductsForCategory(viewingCategory.id).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-muted-foreground">₹{product.price.toLocaleString()}</div>
                    <div className="text-sm">Stock: {product.stock}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No products found for this category.</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewProductsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
```

**Explanation:**

1.  **`isViewProductsDialogOpen` and `setViewingCategory` States:**
    *   `isViewProductsDialogOpen`: A boolean state to control the visibility of the "View Products" dialog.
    *   `setViewingCategory`: Stores the `item` (category object) that was clicked, so the dialog knows which category's products to display.
2.  **`mockProducts` and `getProductsForCategory`:**
    *   `mockProducts`: A simple array of product objects used as placeholder data. In a real application, you would replace this with an API call to fetch products based on the `viewingCategory.id`.
    *   `getProductsForCategory`: A helper function to filter the `mockProducts` based on the `categoryId`.
3.  **`DropdownMenuItem` `onClick`:**
    *   When "View Products" is clicked, `setViewingCategory(item)` saves the current category's data, and `setIsViewProductsDialogOpen(true)` opens the dialog.
4.  **New `Dialog` Component:**
    *   This is a separate `Dialog` component, similar to your existing one for editing.
    *   `DialogTitle` and `DialogDescription` dynamically display the selected category's name and ID.
    *   The content inside the `DialogContent` conditionally renders either a list of products (fetched by `getProductsForCategory`) or a "No products found" message.
    *   The product list iterates through the filtered products and displays their name, price, and stock.
    *   The `DialogFooter` contains a "Close" button to dismiss the dialog.

Remember to replace `mockProducts` and `getProductsForCategory` with your actual data fetching logic from an API or other data source.