'use client'
import { AlertColor } from "@mui/material"
import { createContext, FC, ReactNode, useContext, useState } from "react"
import { Toast, ToastStyle } from "./toast"

export interface ToastMessage {
    message: string
    severity: AlertColor
    key: number
}

export const ToastContext = createContext<{
    addMessage: (message: ToastMessage) => void
}>(null as never)

export const ToastProvider: FC<{ children: ReactNode } & ToastStyle> = ({
    children,
    ...props
}) => {
    const [messages, setMessages] = useState<ToastMessage[]>([])

    const removeMessage = (key: number) =>
        setMessages((arr) => arr.filter((m) => m.key !== key))

    return (
        <ToastContext.Provider
            value={{
                addMessage(message) {
                    setMessages((arr) => [...arr, message])
                },
            }}
        >
            {children}
            {messages.map((m) => (
                <Toast
                    key={m.key}
                    message={m}
                    onExited={() => removeMessage(m.key)}
                    {...props}
                />
            ))}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const { addMessage } = useContext(ToastContext)

    const show = (message: string, options: { severity: AlertColor }) => {
        addMessage({ message, ...options, key: new Date().getTime() })
    }

    return {
        show,
        info(message: string) {
            show(message, { severity: "info" })
        },
        success(message: string) {
            show(message, { severity: "success" })
        },
        warning(message: string) {
            show(message, { severity: "warning" })
        },
        error(message: string) {
            show(message, { severity: "error" })
        },
    }
}