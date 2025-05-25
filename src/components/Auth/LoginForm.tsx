"use client";

import { useForm } from "react-hook-form";

import {
  USER_DOCUMENT_MAX_LENGTH,
  USER_DOCUMENT_MIN_LENGTH,
} from "@/constants/user.constant";
import { useUser } from "@/hooks/useUser";
import {
  UserLoginRequest,
  UserLoginResponse,
  UserLoginResponseData,
} from "@/interfaces/user/userLogin";
import { ApiService } from "@/services/api.service";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const { dispatch } = useUser();

  const minLength = USER_DOCUMENT_MIN_LENGTH;
  const maxLength = USER_DOCUMENT_MAX_LENGTH;
  const dynamicPatternUserDocument = new RegExp(
    `^.{${minLength},${maxLength}}$`
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const apiService = new ApiService();

  const onSubmit = async (data: UserLoginRequest) => {
    const res = await apiService.post<UserLoginResponseData>(
      "/auth/login",
      data
    );
    const resData = res.data;

    const payload: UserLoginResponse = {
      ok: true,
      data: resData,
      errors: null,
      status: 200,
    };

    if (res.ok) {
      dispatch({
        type: "SET_USER",
        payload: {
          userDocument: payload.data.userDocument,
          email: payload.data.email,
          names: payload.data.names,
          lastNames: payload.data.lastNames,
          isActive: payload.data.isActive,
          areas: payload.data.areas,
          roles: payload.data.roles,
          isOnline: true,
        },
      });
      redirect("/");
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userDocument"
          >
            Documento
          </label>
          <input
            {...register("userDocument", {
              required: "El campo documento es obligatorio",
              setValueAs: (value) => value.trim(),
              pattern: {
                value: dynamicPatternUserDocument,
                message: `El campo documento debe contener entre ${minLength} y ${maxLength} caracteres`,
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.userDocument ? "border-red-500" : ""
            }`}
            id="userDocument"
            type="text"
            placeholder="documento"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            {...register("password", {
              required: "El campo contraseña es obligatorio",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.userPassword ? "border-red-500" : ""
            }`}
            id="password"
            type="password"
            placeholder="**********"
          />
          {errors.userDocument && (
            <p className="text-red-500 text-xs italic">
              {errors.userDocument?.message as string}
            </p>
          )}
          {errors.userPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.userPassword?.message as string}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
