import { DocToSlidesRsp } from "@/lib/models";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import DisplaySlides from "./DisplaySlides";
import DisplayOriginal from "./DisplayOriginal";

interface DisplayResultsProps {
  content: string;
  targetSlides: number;
  result: DocToSlidesRsp | null;
  onStartOver: () => void;
}

export default function DisplayResults({
  content,
  targetSlides,
  result,
  onStartOver,
}: DisplayResultsProps) {
  if (!result) {
    return null;
  }

  return (
    <div>
      <DisplayResultsHeader
        targetSlides={targetSlides}
        result={result}
        onStartOver={onStartOver}
      />
      <Tabs defaultValue="slides" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="slides">Slides</TabsTrigger>
          <TabsTrigger value="original">Original</TabsTrigger>
        </TabsList>
        <TabsContent value="slides" className="mt-6">
          <DisplaySlides result={result} />
        </TabsContent>
        <TabsContent value="original" className="mt-6">
          <DisplayOriginal content={content} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface DisplayResultsHeaderProps {
  targetSlides: number;
  result: DocToSlidesRsp;
  onStartOver: () => void;
}

function DisplayResultsHeader({
  targetSlides,
  result,
  onStartOver,
}: DisplayResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">Transformation Results</h2>
        <div className="flex items-center gap-6 p-3 bg-muted/50 rounded-lg">
          <div className="text-sm">
            <span className="text-muted-foreground">Target:</span>{" "}
            <span className="font-medium">{targetSlides} slides</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Cost:</span>{" "}
            <span className="font-medium">${result.cost.toFixed(4)}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Runtime:</span>{" "}
            <span className="font-medium">{result.runTime.toFixed(2)}s</span>
          </div>
        </div>
      </div>
      <Button
        onClick={onStartOver}
        size="sm"
        className="flex items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Start Over
      </Button>
    </div>
  );
}
