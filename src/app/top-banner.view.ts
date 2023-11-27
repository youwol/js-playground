import { TopBannerView as TopBannerViewBase } from '@youwol/os-top-banner'
import { AppState } from './app.state'

/**
 * @category View
 */
export class TopBannerView extends TopBannerViewBase {
    constructor({ appState }: { appState: AppState }) {
        super({
            innerView: {
                tag: 'div',
                class: 'd-flex w-100 justify-content-center my-auto align-items-center',
                children: [
                    {
                        tag: 'div',
                        class: 'd-flex align-items-center p-1 px-2 fv-pointer fv-text-focus fv-bg-background fv-hover-x-lighter fv-border-primary',
                        children: [
                            {
                                tag: 'div',
                                class: {
                                    source$: appState.mode$,
                                    vdomMap: (mode) =>
                                        mode == 'code'
                                            ? 'fas fa-play'
                                            : 'fas fa-pen',
                                },
                            },
                            { tag: 'div', class: 'mx-1' },
                            {
                                tag: 'div',
                                innerText: {
                                    source$: appState.mode$,
                                    vdomMap: (mode) =>
                                        mode == 'code' ? 'run' : 'edit',
                                },
                            },
                        ],
                        onclick: () => {
                            appState.mode$.value == 'code'
                                ? appState.execute()
                                : appState.mode$.next('code')
                        },
                    },
                    { tag: 'div', class: 'mx-2' },
                    {
                        source$: appState.ideState.updates$['./main'],
                        vdomMap: (file: { content: string }) => {
                            const url = `/applications/@youwol/js-playground/latest?content=${encodeURIComponent(
                                file.content,
                            )}`

                            return {
                                tag: 'div',
                                class: 'd-flex align-items-center p-1 border fv-border-primary',
                                children: [
                                    { tag: 'div', class: 'fas fa-share' },
                                    { tag: 'div', class: 'mx-1' },
                                    { tag: 'a', innerText: 'URL', href: url },
                                ],
                            }
                        },
                    },
                ],
            },
        })
    }
}
