import { VirtualDOM } from '@youwol/flux-view'
import { AppState } from './app.state'
import { TopBannerView } from './top-banner.view'
import { CodeEditorView } from './code-editor.view'

export class AppView implements VirtualDOM {
    public readonly appState: AppState
    public readonly class = 'h-100 w-100 d-flex flex-column'
    public readonly children: VirtualDOM[]

    constructor() {
        this.appState = new AppState()
        this.children = [
            new TopBannerView({ appState: this.appState }),
            {
                class: 'w-100 flex-grow-1',
                children: [new CodeEditorView({ appState: this.appState })],
            },
        ]
    }
}
