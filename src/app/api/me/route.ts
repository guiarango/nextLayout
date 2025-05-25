import { ApiService } from "@/services/api.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiService = new ApiService();

  const responseMock = { data: null, errors: null, ok: false, statusCode: 400 };

  const DeleteCookies = (res: NextResponse, cookieName: string) => {
    res.cookies.set(cookieName, "", {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0),
    });
  };

  const token = req.cookies.get("token")?.value;
  const refreshTokenId = req.cookies.get("refreshTokenId")?.value;

  if (!refreshTokenId) {
    const res = NextResponse.json({
      ...responseMock,
      errors: "No refresh token provided",
    });
    DeleteCookies(res, "token");
    DeleteCookies(res, "refreshTokenId");
    return res;
  }

  const response = await apiService.post(
    `/auth/authMe`,
    {},
    {
      headers: {
        Cookie: `token=${token}; refreshTokenId=${refreshTokenId}`,
      },
    }
  );

  if (!response.ok) {
    const res = NextResponse.json({
      ...responseMock,
      errors: "refresh token doesn't exist",
    });
    DeleteCookies(res, "token");
    DeleteCookies(res, "refreshTokenId");
    return res;
  }

  const { newToken, newRefreshToken } = response.data as unknown as {
    newToken: { newToken: string; tokenExp: number };
    newRefreshToken: { refreshTokenExp: string; refreshTokenId: string };
  };

  const res = NextResponse.json(response);
  if (newToken?.newToken) {
    res.cookies.set("token", newToken.newToken, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "lax",
      expires: new Date(newToken.tokenExp * 1000),
    });
  }

  if (newRefreshToken?.refreshTokenExp) {
    res.cookies.set("refreshTokenId", newRefreshToken.refreshTokenId, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "lax",
      expires: new Date(newRefreshToken.refreshTokenExp),
    });
  }

  return res;
}
