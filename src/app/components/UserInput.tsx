import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAX_NUM_SLIDES } from "@/lib/config";
import { docToSlidesReqSchema } from "@/lib/models";
import toast from "react-hot-toast";

interface UserInputProps {
  onSubmit: (content: string, targetSlides: number) => void;
  content: string;
  setContent: (content: string) => void;
  targetSlides: number;
  setTargetSlides: (slides: number) => void;
}

export default function UserInput({
  onSubmit,
  content,
  setContent,
  targetSlides,
  setTargetSlides,
}: UserInputProps) {
  const loadExampleContent = async () => {
    const response = await fetch("/example.md");
    const text = await response.text();
    setContent(text);
  };

  const handleSubmit = async () => {
    const validationResult = docToSlidesReqSchema.safeParse({
      text: content,
      numSlides: targetSlides,
    });
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    onSubmit(content, targetSlides);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Doc to Slides</h1>
          <div className="flex items-center gap-2">
            <label htmlFor="target-slides" className="text-sm font-medium">
              Target slides:
            </label>
            <Input
              id="target-slides"
              type="number"
              min="1"
              max={MAX_NUM_SLIDES}
              value={targetSlides}
              onChange={(e) => setTargetSlides(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadExampleContent}>Use Example</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-96 w-full"
        placeholder="Click 'Use Example' to load content or start typing... (must be a valid markdown document)"
      />
    </div>
  );
}
