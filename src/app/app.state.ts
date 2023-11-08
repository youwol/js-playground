import { Common } from '@youwol/fv-code-mirror-editors'
import { example } from './default-code'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { mergeMap, tap, withLatestFrom } from 'rxjs/operators'

const encoded = new URLSearchParams(window.location.search).get('content')

export class AppState {
    public readonly ideState = new Common.IdeState({
        files: [
            {
                path: './main',
                content: encoded ? decodeURI(encoded) : example,
            },
        ],
        defaultFileSystem: Promise.resolve(new Map<string, string>()),
    })
    public readonly run$ = new Subject()
    public readonly result$: Observable<unknown>
    public readonly mode$ = new BehaviorSubject<'code' | 'view'>('code')
    public readonly message$ = new Subject()
    constructor() {
        this.result$ = this.run$.pipe(
            withLatestFrom(this.ideState.updates$['./main']),
            mergeMap(([, file]) => {
                return of(file.content)
            }),
            tap(() => {
                this.mode$.next('view')
            }),
        )
    }

    execute() {
        this.run$.next()
    }
}
