import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import React from "react";


export default function Protected({children}){
    const isAuthenticated = UserAuth();

    return isAuthenticated ? children : redirect("/");
}