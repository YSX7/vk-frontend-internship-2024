import { Button, Div, FormItem, Group, Input, Spinner } from "@vkontakte/vkui";
import { ComponentProps, useEffect, useState } from "react";
import { useAgeStatus } from "src/shared/model/age-status";
import styles from "./style.module.css";

type Agify = {
  count: number
  name: string
  age: number
}

export function Agify(props : ComponentProps<typeof Group>) {

  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [isDebouncing, setIsDebouncing] = useState(false)

  const ageStatus = useAgeStatus(age)

  useEffect(() => {
    if(!name) {
      setIsDebouncing(false)
      return;
    }
    setIsDebouncing(true)
    const delayInputTimeoutId = setTimeout(() => {
      checkAge();
      setIsDebouncing(false)
    }, 3000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [name]);

  const checkAge = async () => {
    if (isLoading) return
    setAge(undefined);
    setIsLoading(true);
    try {
      const data = await fetch(`https://api.agify.io?name=${name}`, {cache: "force-cache"}).then<Agify>(res => res.json())
      setAge(data.age)
    }
    catch (error) {
      console.error(error)
      setError("Ошибка получения возраста, попробуйте ещё раз.")
    }
    setIsLoading(false);
  }

  return (<Group id="tab-content-agify" aria-labelledby="tab-agify" role="tabpanel" {...props}>
    <form onSubmit={(e) => {
      e.preventDefault();
      checkAge()
    }}>
      <FormItem htmlFor="agify-input"
        top="Введите имя">
        <Input
          id="agify-input"
          value={name}
          onChange={e => setName(e.target.value)}
          after={
            <Spinner style={{visibility:  isDebouncing ? 'visible' : 'hidden'}}/>
          }
        />
      </FormItem>
      <FormItem
        status={error ? 'error' : 'default'}
        bottom={error}>
        <Button type="submit" size="l" stretched disabled={isLoading || !name}>
          {isLoading ? <Spinner /> : "Проверить возраст"}
        </Button>
      </FormItem>

    </form>
    <Div className={styles['age-status']}>{ageStatus}</Div>
  </Group>)

}
