import { authApi } from "@/apis/auth.api"
import { IUser } from "@/interfaces/user.interfaces"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useGetMe = () => {
    const query = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => authApi.me(),
    })

    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        if(!!query.data) {
            setUser(query.data)
        }
    }, [query])

    return {
        user, 
        setUser
    }
}