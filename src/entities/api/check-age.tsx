import { useState } from "react"

type AgeCache = {
    [key: string]: number
}

type AgifyResponse = {
    count: number
    name: string
    age: number
}

export function useCheckAge(name: string) {
    const ageCache: AgeCache = {}
    let controller: AbortController;

    const [age, setAge] = useState<number>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>()

    const refetch = async () => {
        if (controller) controller.abort()
        controller = new AbortController()
        setAge(undefined);
        setError(undefined);
        setIsLoading(true);

        try {
            if (!name) {
                return
            }

            if (ageCache[name]) {
                setAge(ageCache[name])
                return
            }
            const { age } = await fetch(`https://api.agify.io?name=${name}`, { signal: controller.signal }).then<AgifyResponse>(res => res.json())
            ageCache[name] = age
            setAge(age)
        }
        catch (err) {
            if (err instanceof Error && err.name == 'AbortError') return
            console.error(error)
            setError("Ошибка получения возраста, попробуйте ещё раз.")
        } finally {
            setIsLoading(false);
        }
    }

    return [{ data: age, error, isLoading }, refetch] as const
}
