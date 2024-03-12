import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'

const reactRoot = createRoot(
  document.getElementById('root')!,
)

reactRoot.render(
  <React.StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>
)
