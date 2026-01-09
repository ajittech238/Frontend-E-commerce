import { useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ReviewFormProps {
  productName: string;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ReviewForm({ productName, onOpenChange }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      toast({
        title: "Incomplete Review",
        description: "Please provide a rating and a comment.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would submit this data to your backend.
    console.log({
      product: productName,
      rating,
      comment,
    });

    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback.",
    });

    onOpenChange(false); // Close the dialog on submit
  };

  return (
    <div className="p-1">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Write a review for</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{productName}</p>
        </div>
        
        {/* Star Rating */}
        <div className="flex justify-center items-center gap-2">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <Star
                key={starValue}
                className={cn(
                  "h-8 w-8 cursor-pointer transition-all",
                  starValue <= (hoverRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                )}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
              />
            );
          })}
        </div>

        {/* Comment Textarea */}
        <div>
          <label htmlFor="comment" className="sr-only">
            Comment
          </label>
          <Textarea
            id="comment"
            name="comment"
            rows={4}
            className="shadow-sm block w-full focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md"
            placeholder="Tell us what you thought..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
}
