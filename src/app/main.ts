require('./style.css')
export {}
import * as webpmClient from '@youwol/webpm-client'

import { setup } from '../auto-generated'

await setup.installMainModule({
    cdnClient: webpmClient,
    installParameters: {
        css: [
            'bootstrap#4.4.1~bootstrap.min.css',
            'fontawesome#5.12.1~css/all.min.css',
            '@youwol/fv-widgets#latest~dist/assets/styles/style.youwol.css',
            'codemirror#5.52.0~codemirror.min.css',
            'codemirror#5.52.0~theme/blackboard.min.css',
        ],
        scripts: [
            'codemirror#5.52.0~mode/javascript.min.js',
            'codemirror#5.52.0~mode/markdown.min.js',
            'codemirror#5.52.0~mode/css.min.js',
            'codemirror#5.52.0~mode/xml.min.js',
            'codemirror#5.52.0~mode/htmlmixed.min.js',
            'codemirror#5.52.0~mode/gfm.min.js',
        ],
        displayLoadingScreen: true,
    },
})
await import('./on-load')
