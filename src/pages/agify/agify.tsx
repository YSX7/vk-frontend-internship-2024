import { Button, Div, FormItem, Group, Input, Spinner } from "@vkontakte/vkui";
import { ComponentProps, useEffect, useState } from "react";
import { useAgeStatus } from "src/shared/model/age-status";
import styles from "./style.module.css";
import { useCheckAge } from "src/shared/api/check-age";


export function Agify(props: ComponentProps<typeof Group>) {

  let delayInputTimeoutId: NodeJS.Timeout;

  const [name, setName] = useState<string>('')
  const [isDebouncing, setIsDebouncing] = useState(false)

  const [age, fetchAge] = useCheckAge(name)
  const ageStatus = useAgeStatus(age.data)

  useEffect(() => {
    if (!name) {
      setIsDebouncing(false)
      fetchAge()
      return;
    }
    setIsDebouncing(true)
    delayInputTimeoutId = setTimeout(() => {
      fetchAge()
      setIsDebouncing(false)
    }, 3000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [name]);

  return (<Group id="tab-content-agify" aria-labelledby="tab-agify" role="tabpanel" {...props}>
    <form onSubmit={(e) => {
      e.preventDefault();
      clearTimeout(delayInputTimeoutId)
      setIsDebouncing(false)
      fetchAge()
    }}>
      <FormItem htmlFor="agify-input"
        top="Введите имя">
        <Input
          id="agify-input"
          value={name}
          onChange={e => setName(e.target.value)}
          after={
            <Spinner style={{ visibility: isDebouncing ? 'visible' : 'hidden' }} />
          }
        />
      </FormItem>
      <FormItem
        status={age.error ? 'error' : 'default'}
        bottom={age.error}>
        <Button type="submit" size="l" stretched disabled={age.isLoading || !name}>
          {age.isLoading ? <Spinner /> : "Проверить возраст"}
        </Button>
      </FormItem>

    </form>
    <Div className={styles['age-status']}>{ageStatus}</Div>
  </Group>)

}
