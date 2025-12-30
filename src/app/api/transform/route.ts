import { NextRequest, NextResponse } from "next/server";
import { docToSlidesReqSchema } from "@/lib/models";
import { transformDocToSlides } from "./transform";

export async function POST(request: NextRequest) {
  const { text, numSlides } = docToSlidesReqSchema.parse(await request.json());
  const rsp = await transformDocToSlides(text, numSlides); // long running process, needs to be run asynchronously in a production system
  return NextResponse.json(rsp);
}
