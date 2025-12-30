"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { DocToSlidesRsp, docToSlidesRspSchema } from "@/lib/models";
import axios from "axios";
import UserInput from "./components/UserInput";
import DisplayResults from "./components/DisplayResults";
import toast from "react-hot-toast";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DocToSlidesRsp | null>(null);
  const [content, setContent] = useState("");
  const [targetSlides, setTargetSlides] = useState(10);

  const handleSubmit = async (content: string, targetSlides: number) => {
    setLoading(true);
    setResult(null);

    try {
      const rsp = await axios.post("api/transform", {
        text: content,
        numSlides: targetSlides,
      });
      setResult(docToSlidesRspSchema.parse(rsp.data));
    } catch {
      toast.error("Failed to transform document");
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setResult(null);
    setContent("");
    setTargetSlides(10);
  };

  if (loading) {
    return (
      <div className="mt-4 flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Processing your document...</span>
      </div>
    );
  }

  if (result) {
    return (
      <DisplayResults
        content={content}
        targetSlides={targetSlides}
        result={result}
        onStartOver={handleStartOver}
      />
    );
  }

  return (
    <UserInput
      onSubmit={handleSubmit}
      content={content}
      setContent={setContent}
      targetSlides={targetSlides}
      setTargetSlides={setTargetSlides}
    />
  );
}
