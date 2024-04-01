import React from "react"

type CenteredTextProps = {
    children: React.ReactNode
}

export default function CenteredText({children}: CenteredTextProps){
    return (
        <div className="w-full h-screen flex justify-center items-center">
            {children}
        </div>
    )
}