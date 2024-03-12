import { Icon16Clear } from "@vkontakte/icons";
import { Button, Div, FormItem, FormLayoutGroup, Group, IconButton, Input } from "@vkontakte/vkui";
import { clear } from "console";
import React, { Ref, useRef } from "react";

export function CatFacts() {
    const textInput = useRef<Ref<HTMLInputElement>>();
    const clear = () => {
        if (textInput.current) {
            textInput.current.value = '';
            textInput.current.focus();
        }
    };
    return (<Group id="tab-content-cat-facts" aria-labelledby="tab-cat-facts" role="tabpanel">
        <form onSubmit={(e) => e.preventDefault()}>
            <FormItem
                htmlFor="exampleClickable"
                top="📝 Пример с кликабельной иконкой"
                status={"default"}
            >
                <Input
                    id="exampleClickable"
                    getRef={textInput}
                    type="text"
                    placeholder="Ну ведь брокколи это вкусно и полезно 😢"
                    defaultValue="Брокколи 🥦"
                />
            </FormItem>
            <Button type="submit" size="l" stretched>
                Зарегистрироваться
            </Button>
        </form>
    </Group>)
}