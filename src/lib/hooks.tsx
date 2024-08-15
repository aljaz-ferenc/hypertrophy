import { useEffect, useState } from "react"

export function useScreenSize(){
    const [screenSize, setScreenSize] = useState({width: innerWidth, height: innerHeight})

    useEffect(() => {
        addEventListener('resize', onResize)

        return () => removeEventListener('resize', onResize)
    }, [])

    function onResize(){
        setScreenSize({width: innerWidth, height: innerHeight})
    }

    return screenSize
}