import { Common } from '@youwol/fv-code-mirror-editors'
import { example } from './default-code'
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs'
import { catchError, mergeMap, tap, withLatestFrom } from 'rxjs/operators'
import * as cdnClient from '@youwol/cdn-client'

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
    public readonly url$ = new Subject<string>()
    public readonly result$: Observable<unknown>
    public readonly mode$ = new BehaviorSubject<'code' | 'view'>('code')
    public readonly message$ = new Subject()
    constructor() {
        this.result$ = this.run$.pipe(
            withLatestFrom(this.ideState.updates$['./main']),
            mergeMap(([, file]) => {
                try {
                    const fct = new Function(file.content)()
                    const result = fct({ cdnClient }, this.message$)
                    return from(result).pipe(
                        catchError((err) => {
                            console.log('Got an error 0', err)
                            return of(undefined)
                        }),
                    )
                } catch (err) {
                    console.log(err)
                    return of(undefined)
                }
            }),
            catchError((err) => {
                console.log('Got an error', err)
                return of(undefined)
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
