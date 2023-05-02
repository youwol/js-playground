import { render } from '@youwol/flux-view'
import { AppView } from './app.view'

export {}

document.getElementById('content').appendChild(render(new AppView()))
