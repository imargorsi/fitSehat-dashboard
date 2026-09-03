"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

import { UiIcon } from "@/components/icons/ui-icon"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      className="toaster group"
      icons={{
        success: <UiIcon name="circleCheck" size={16} />,
        info: <UiIcon name="info" size={16} />,
        warning: <UiIcon name="alert" size={16} />,
        error: <UiIcon name="close" size={16} />,
        loading: <UiIcon name="loader" size={16} spin />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
