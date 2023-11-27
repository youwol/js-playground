import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { Common } from '@youwol/rx-code-mirror-editors'
import { AppState } from './app.state'

export class CodeEditorView implements VirtualDOM<'div'> {
    public readonly appState: AppState
    public readonly tag = 'div'
    public readonly class = 'w-100 h-100 d-flex flex-column p-1'
    public readonly children: ChildrenLike

    constructor(params: { appState: AppState }) {
        Object.assign(this, params)
        const ideView = new Common.CodeEditorView({
            ideState: this.appState.ideState,
            path: './main',
            language: 'htmlmixed',
            config: {
                extraKeys: {
                    'Ctrl-Enter': () => {
                        this.appState.execute()
                    },
                },
            },
        })
        this.children = [
            {
                source$: this.appState.message$,
                vdomMap: (message) => new MessageView(message),
            },
            {
                tag: 'div',
                class: {
                    source$: this.appState.mode$,
                    vdomMap: (mode) =>
                        mode == 'code' ? 'flex-grow-1' : 'd-none',
                },
                style: { minHeight: '0px' },
                children: [ideView],
            },
            {
                tag: 'div',
                class: {
                    source$: this.appState.mode$,
                    vdomMap: (mode) =>
                        mode == 'view' ? 'flex-grow-1' : 'd-none',
                },
                style: { minHeight: '0px' },
                children: [
                    {
                        tag: 'iframe',
                        width: '100%',
                        style: { height: '100%', backgroundColor: 'white' },
                        srcdoc: {
                            source$: this.appState.result$,
                            vdomMap: (r: string) => r,
                        },
                    },
                ],
            },
            { tag: 'div', class: 'my-2' },
        ]
    }
}

export class MessageView implements VirtualDOM<'pre'> {
    public readonly tag = 'pre'
    public readonly class = 'd-flex align-items-center fv-text-primary'
    public readonly children: ChildrenLike

    constructor(message) {
        if (message == 'done') {
            return
        }
        this.children = [
            {
                tag: 'div',
                class: 'fas fa-spinner fa-spin mx-2',
            },
            { tag: 'div', innerText: message },
        ]
    }
}
