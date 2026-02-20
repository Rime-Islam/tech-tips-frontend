"use client"
import { persistor, store } from "@/redux/app/store";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";



export interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <Toaster position="bottom-right" theme="system" richColors expand={true} />
            <PersistGate loading={null} persistor={persistor}>
                <Provider store={store}>
                    {children}
                </Provider>
            </PersistGate>
        </NextUIProvider>
    )
}