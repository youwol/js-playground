import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { AppState } from './app.state'
import { TopBannerView } from './top-banner.view'
import { CodeEditorView } from './code-editor.view'

export class AppView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly appState: AppState
    public readonly class = 'h-100 w-100 d-flex flex-column'
    public readonly children: ChildrenLike

    constructor() {
        this.appState = new AppState()
        this.children = [
            new TopBannerView({ appState: this.appState }),
            {
                tag: 'div',
                class: 'w-100 flex-grow-1',
                style: { minHeight: '0px' },
                children: [new CodeEditorView({ appState: this.appState })],
            },
        ]
    }
}
