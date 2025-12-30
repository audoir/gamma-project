import Markdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DisplayOriginalProps {
  content: string;
}

export default function DisplayOriginal({ content }: DisplayOriginalProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Original Document</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none">
          <Markdown>{content}</Markdown>
        </div>
      </CardContent>
    </Card>
  );
}
