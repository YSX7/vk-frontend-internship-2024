import { Button, FormItem, Group, Spinner, Textarea } from "@vkontakte/vkui";
import { FormEvent, useRef, useState } from "react";

type CatFact = {
    fact: string,
    length: number
}

export function CatFacts() {

    const textInput = useRef<HTMLTextAreaElement>(null);
    const [error, setError] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)

    const getFact = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        setError(undefined)
        if (!textInput.current) {
            setError("Что-то пошло не так, попробуйте ещё раз.")
            return
        }
        try {
            const data = await fetch("https://catfact.ninja/fact").then<CatFact>(res => res.json())
            const input = textInput.current
            input.value = data.fact
            input.focus()
            input.selectionStart = input.selectionEnd = data.fact.indexOf(' ')
        }
        catch (e) {
            console.error(e)
            setError("Ошибка получения факта, попробуйте ещё раз.")
        }
        setIsLoading(false)
    }

    return (<Group id="tab-content-cat-facts" aria-labelledby="tab-cat-facts" role="tabpanel">
        <form onSubmit={getFact}>
            <FormItem
                status={error ? 'error' : 'default'}
                bottom={error}>
                <Button type="submit" size="l" stretched disabled={isLoading}>
                    {isLoading ? <Spinner /> : "Зафактить"}
                </Button>
            </FormItem>
            <FormItem htmlFor="catfactTextArea"
                top="👆 Нажмите кнопку, чтобы получить факт о кошках">
                <Textarea
                    id="catfactTextArea"
                    getRef={textInput}
                    grow={true}
                />
            </FormItem>

        </form>
    </Group>)
}