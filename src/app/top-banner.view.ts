import { TopBannerView as TopBannerViewBase } from '@youwol/os-top-banner'
import { AppState } from './app.state'
import { attr$, child$ } from '@youwol/flux-view'

/**
 * @category View
 */
export class TopBannerView extends TopBannerViewBase {
    constructor({ appState }: { appState: AppState }) {
        super({
            innerView: {
                class: 'd-flex w-100 justify-content-center my-auto align-items-center',
                children: [
                    {
                        class: 'd-flex align-items-center p-1 px-2 fv-pointer fv-text-focus fv-bg-background fv-hover-x-lighter fv-border-primary',
                        children: [
                            {
                                class: attr$(appState.mode$, (mode) =>
                                    mode == 'code'
                                        ? 'fas fa-play'
                                        : 'fas fa-pen',
                                ),
                            },
                            { class: 'mx-1' },
                            {
                                innerText: attr$(appState.mode$, (mode) =>
                                    mode == 'code' ? 'run' : 'edit',
                                ),
                            },
                        ],
                        onclick: () => {
                            appState.mode$.value == 'code'
                                ? appState.execute()
                                : appState.mode$.next('code')
                        },
                    },
                    { class: 'mx-2' },
                    child$(appState.ideState.updates$['./main'], (file) => {
                        const url = `/applications/@youwol/js-playground/latest?content=${encodeURIComponent(
                            file.content,
                        )}`

                        return {
                            class: 'd-flex align-items-center p-1 border fv-border-primary',
                            children: [
                                { class: 'fas fa-share' },
                                { class: 'mx-1' },
                                { tag: 'a', innerText: 'URL', href: url },
                            ],
                        }
                    }),
                ],
            },
        })
    }
}
