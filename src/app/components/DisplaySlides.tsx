import { DocToSlidesRsp } from "@/lib/models";
import Markdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DisplaySlidesProps {
  result: DocToSlidesRsp;
}

export default function DisplaySlides({ result }: DisplaySlidesProps) {
  return (
    <div className="grid gap-6">
      {result.slides?.map((slide, index) => (
        <Card key={index} className="w-full min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Slide {index + 1} of {result.slides?.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none leading-relaxed">
              <Markdown>{slide}</Markdown>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
