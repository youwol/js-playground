export const example = `return async ({cdnClient}) => {
    // Reactive version of https://getbootstrap.com/docs/4.0/components/dropdowns/
    // using flux-view (see https://l.youwol.com/doc/@youwol/flux-view)
    
    const {FV, rx} = await cdnClient.install({
        modules:['bootstrap#^4.4.0', '@youwol/flux-view#^1.1.0'],
        css: ['bootstrap#^4.4.0~bootstrap.min.css'],
        aliases: {
            FV: '@youwol/flux-view',
            // rxjs is an indirect dependency of @youwol/flux-view
            rx: 'rxjs'
        }
    })
    const source$ = new rx.BehaviorSubject([{date:new Date()}])
    const selected$ = new rx.Subject()
    const vDOM = {
        children:[
            {
                class:'dropdown',
                children: [{ 
                        tag:'button', class:'btn btn-secondary dropdown-toggle', type:'button',
                        customAttributes:{'data-toggle':'dropdown'},
                        // innerText is updated each time selected$ emit a new item
                        innerText: FV.attr$(
                            selected$, 
                            (item) => item.date.toLocaleString(), 
                            {untilFirst:'Dropdown button'}
                        )
                    },
                    {
                        class:'dropdown-menu',
                        // new children are added each time source$ emit
                        children: FV.childrenAppendOnly$(
                            source$,
                            (item) => ({
                                class:'dropdown-item fv-pointer',
                                innerText: item.date.toLocaleString(), 
                                onclick: () => selected$.next(item)
                            })
                        )
                    }
                ]
            },
            { class:'my-2' },
            {
                tag:'button', class:'btn btn-secondary',
                innerText: 'Add item',
                onclick: () => source$.next([{date:new Date()}])
            }
        ]
    }
    // FV.render return an HTMLElement, the one displayed when code is ran.
    return FV.render(vDOM)
}

`
