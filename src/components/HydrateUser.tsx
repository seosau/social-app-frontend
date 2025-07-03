'use client'

import { useGetMe } from "@/hooks/useGetMe";
import { setUser } from "@/lib/redux/features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

export default function HydateUser() {
    const dispatch = useDispatch();

    const {user} = useGetMe()

    useEffect(() => {
        if(!!user) {
            dispatch(setUser(user))
        }
    }, [user]);

    return null;
}