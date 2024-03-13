import { Button, Div, FormItem, Group, Input, Spinner } from "@vkontakte/vkui";
import { FormEvent, useEffect, useRef, useState } from "react";

type Agify = {
  count: number
  name: string
  age: number
}

export function Agify() {

  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      checkAge()
    }, 3000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [name]);

  const checkAge = async () => {

    setIsLoading(true);
    try {
      const data = await fetch(`https://api.agify.io?name=${name}`).then<Agify>(res => res.json())
      setAge(data.age)
  }
  catch (error) {
      console.error(error)
      setError("Ошибка получения возраста, попробуйте ещё раз.")
  }
    setIsLoading(false);
  }


  return (<Group id="tab-content-agify" aria-labelledby="tab-agify" role="tabpanel">
    <form onSubmit={(e) => {
        e.preventDefault();
        checkAge()
    }}>
      <FormItem htmlFor="agify-input"
        top="Имя">
        <Input
          id="agify-input"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FormItem>
      <FormItem
        status={error ? 'error' : 'default'}
        bottom={error}>
        <Button type="submit" size="l" stretched disabled={isLoading}>
          {isLoading ? <Spinner /> : "Проверить возраст"}
        </Button>
      </FormItem>

    </form>
    <Div>Возраст: {age}</Div>
  </Group>)

}