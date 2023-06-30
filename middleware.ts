//NextApiRequest는 "next" 여기서 다루는 req 등은 서버용
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

//next에서 middleware.ts를 인식함
export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;
  if (!bearerToken)
    return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized" }), {
      status: 401,
    });

  const token = bearerToken.split(" ")[1];
  if (!token)
    return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized" }), {
      status: 401,
    });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized" }), {
      status: 401,
    });
  }
}

//지정한 주소를 감지하여 실행
export const config = {
  matcher: ["/api/auth/me"],
};
