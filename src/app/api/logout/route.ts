import { ApiService } from "@/services/api.service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const apiService = new ApiService();

  const responseMock = { data: null, errors: null, ok: false, statusCode: 400 };

  const deleteCookies = (res: NextResponse, cookieName: string) => {
    res.cookies.set(cookieName, "", {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0),
    });
  };

  const refreshTokenId = req.cookies.get("refreshTokenId")?.value;

  if (!refreshTokenId) {
    const res = NextResponse.json({
      ...responseMock,
      errors: "No refresh token provided",
    });
    deleteCookies(res, "refreshTokenId");
    deleteCookies(res, "token");
    return res;
  }

  const response = await apiService.delete(`/auth/logout`, {
    headers: {
      Cookie: `refreshTokenId=${refreshTokenId}`,
    },
  });

  const res = NextResponse.json({
    ...responseMock,
    data: response.data,
    ok: response.ok,
    statusCode: response.statusCode,
  });

  deleteCookies(res, "refreshTokenId");
  deleteCookies(res, "token");
  return res;
}
