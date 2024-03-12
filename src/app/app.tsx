import { AppRoot, Div, Group, Panel, PanelHeader, PanelHeaderContent, Tabs, TabsItem, View } from '@vkontakte/vkui';
import React, { FunctionComponent } from 'react'
import '@vkontakte/vkui/dist/vkui.css';
import { CatFacts } from 'src/pages/cat-facts';
import { Agify } from 'src/pages/agify';

const TABS = [
  {
    title: "😸 Котофакты",
    id: "cat-facts"
  },
  {
    title: "⌛ Возрастолог",
    id: "agify"
  }
] as const

export const App: FunctionComponent = () => {
  const [selected, setSelected] = React.useState<typeof TABS[number]['id']>('cat-facts');

  return (
    <AppRoot>
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader
            before={
              <PanelHeaderContent title='Самое Полезное Приложение в Мире'>
                СМПМ
              </PanelHeaderContent>
            }
          >
            <Tabs>
              {TABS.map(({ title, id }) => (
                <TabsItem
                key={id}
                selected={selected === id}
                onClick={() => {
                  setSelected(id);
                }}
                id={`tab-${id}`}
                aria-controls={`tab-content-${id}`}
              >
                {title}
              </TabsItem>
              ))}
            </Tabs>
          </PanelHeader>
          {selected === 'cat-facts' && <CatFacts/>}
          {selected === 'agify' && <Agify/>}
        </Panel>
      </View>
    </AppRoot>
  );
}
