'use client'

import { hydrateUserFromStorage } from "@/lib/redux/features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

export default function HydateUser() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hydrateUserFromStorage());
    }, [dispatch]);

    return null;
}