"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {httpBatchLink} from "@trpc/client"
import {useState} from "react"
import {TrpcApp} from "@/utils/trpc"

export const TrpcProvider: React.FC<{children: React.ReactNode}> = p => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        TrpcApp.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:3000/api/trpc"
                })
            ],
        })
    )
    return (
        <TrpcApp.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {p.children}
             </QueryClientProvider>
        </TrpcApp.Provider>
    )
}