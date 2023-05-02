import { VirtualDOM, child$, attr$ } from '@youwol/flux-view'
import { Common } from '@youwol/fv-code-mirror-editors'
import { AppState } from './app.state'

export class CodeEditorView implements VirtualDOM {
    public readonly appState: AppState
    public readonly class = 'w-100 h-100 d-flex flex-column p-1'
    public readonly children: VirtualDOM[]

    constructor(params: { appState: AppState }) {
        Object.assign(this, params)
        const ideView = new Common.CodeEditorView({
            ideState: this.appState.ideState,
            path: './main',
            language: 'javascript',
            config: {
                extraKeys: {
                    'Ctrl-Enter': () => {
                        this.appState.execute()
                    },
                },
            },
        })
        this.children = [
            child$(
                this.appState.message$,
                (message) => new MessageView(message),
            ),
            {
                class: attr$(this.appState.mode$, (mode) =>
                    mode == 'code' ? 'flex-grow-1' : 'd-none',
                ),
                style: { minHeight: '0px' },
                children: [ideView],
            },
            {
                class: attr$(this.appState.mode$, (mode) =>
                    mode == 'view' ? 'flex-grow-1' : 'd-none',
                ),
                style: { minHeight: '0px' },
                children: [child$(this.appState.result$, (vDom) => vDom)],
            },
            { class: 'my-2' },
        ]
    }
}

export class MessageView implements VirtualDOM {
    public readonly tag = 'pre'
    public readonly class = 'd-flex align-items-center fv-text-primary'
    public readonly children: VirtualDOM[]

    constructor(message) {
        if (message == 'done') {
            return
        }
        this.children = [
            {
                class: 'fas fa-spinner fa-spin mx-2',
            },
            {
                innerText: message,
            },
        ]
    }
}
