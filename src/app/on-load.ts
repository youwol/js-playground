import { render } from '@youwol/rx-vdom'
import { AppView } from './app.view'

export {}

document.getElementById('content').appendChild(render(new AppView()))
