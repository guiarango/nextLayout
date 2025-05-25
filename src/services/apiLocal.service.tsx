import { JsonResponse } from "@/interfaces/common/json-response.interface";

export class ApiLocalService {
  private headers: Record<string, string> = {
    Accept: "application/json",
  };

  constructor() {}

  public async get<T>(path: string, params?: any): Promise<JsonResponse<T>> {
    try {
      const response = await fetch(`${path}`, {
        method: "GET",
        headers: {
          ...this.headers,
          ...params,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  public async post<T>(
    path: string,
    data: any,
    params?: any
  ): Promise<JsonResponse<T>> {
    try {
      if (!data) {
        throw new Error("No se puede enviar un objeto vacio");
      }

      let body: string | FormData = data;
      let newHeaders = { ...this.headers };

      if (!(data instanceof FormData)) {
        newHeaders["Content-Type"] = "application/json";
        body = JSON.stringify(data);
      }

      const response = await fetch(`${path}`, {
        method: "POST",
        headers: { ...newHeaders },
        ...params,
        body,
        credentials: "include",
      });

      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  public async put<T>(
    path: string,
    data: any,
    params?: any
  ): Promise<JsonResponse<T>> {
    try {
      if (!data) {
        throw new Error("No se puede enviar un objeto vacio");
      }

      let body: string | FormData = data;
      let newHeaders = { ...this.headers };

      if (!(data instanceof FormData)) {
        newHeaders["Content-Type"] = "application/json";
        body = JSON.stringify(data);
      }

      const response = await fetch(`${path}`, {
        method: "PUT",
        headers: { ...newHeaders },
        ...params,
        body,
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  public async delete<T>(path: string, params?: any): Promise<JsonResponse<T>> {
    try {
      const response = await fetch(`${path}`, {
        method: "DELETE",
        headers: { ...this.headers },
        ...params,
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
