
const runTimeDependencies = {
    "externals": {
        "@youwol/webpm-client": "^3.0.0",
        "@youwol/rx-vdom": "^1.0.1",
        "@youwol/rx-code-mirror-editors": "^0.4.1",
        "rxjs": "^7.5.6",
        "@youwol/http-clients": "^3.0.0",
        "@youwol/http-primitives": "^0.2.0",
        "@youwol/os-top-banner": "^0.2.0"
    },
    "includedInBundle": {}
}
const externals = {
    "@youwol/webpm-client": "window['@youwol/webpm-client_APIv3']",
    "@youwol/rx-vdom": "window['@youwol/rx-vdom_APIv1']",
    "@youwol/rx-code-mirror-editors": "window['@youwol/rx-code-mirror-editors_APIv04']",
    "rxjs": "window['rxjs_APIv7']",
    "@youwol/http-clients": "window['@youwol/http-clients_APIv3']",
    "@youwol/http-primitives": "window['@youwol/http-primitives_APIv02']",
    "@youwol/os-top-banner": "window['@youwol/os-top-banner_APIv02']",
    "rxjs/operators": "window['rxjs_APIv7']['operators']"
}
const exportedSymbols = {
    "@youwol/webpm-client": {
        "apiKey": "3",
        "exportedSymbol": "@youwol/webpm-client"
    },
    "@youwol/rx-vdom": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/rx-vdom"
    },
    "@youwol/rx-code-mirror-editors": {
        "apiKey": "04",
        "exportedSymbol": "@youwol/rx-code-mirror-editors"
    },
    "rxjs": {
        "apiKey": "7",
        "exportedSymbol": "rxjs"
    },
    "@youwol/http-clients": {
        "apiKey": "3",
        "exportedSymbol": "@youwol/http-clients"
    },
    "@youwol/http-primitives": {
        "apiKey": "02",
        "exportedSymbol": "@youwol/http-primitives"
    },
    "@youwol/os-top-banner": {
        "apiKey": "02",
        "exportedSymbol": "@youwol/os-top-banner"
    }
}

const mainEntry : {entryFile: string,loadDependencies:string[]} = {
    "entryFile": "./main.ts",
    "loadDependencies": [
        "@youwol/webpm-client",
        "@youwol/rx-vdom",
        "@youwol/rx-code-mirror-editors",
        "rxjs",
        "@youwol/http-clients",
        "@youwol/http-primitives",
        "@youwol/os-top-banner"
    ]
}

const secondaryEntries : {[k:string]:{entryFile: string, name: string, loadDependencies:string[]}}= {}

const entries = {
     '@youwol/js-playground': './main.ts',
    ...Object.values(secondaryEntries).reduce( (acc,e) => ({...acc, [`@youwol/js-playground/${e.name}`]:e.entryFile}), {})
}
export const setup = {
    name:'@youwol/js-playground',
        assetId:'QHlvdXdvbC9qcy1wbGF5Z3JvdW5k',
    version:'0.2.3-wip',
    shortDescription:"Small playground for index.html + js application",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/js-playground&tab=doc',
    npmPackage:'https://www.npmjs.com/package/@youwol/js-playground',
    sourceGithub:'https://github.com/youwol/js-playground',
    userGuide:'https://l.youwol.com/doc/@youwol/js-playground',
    apiVersion:'02',
    runTimeDependencies,
    externals,
    exportedSymbols,
    entries,
    secondaryEntries,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    },

    installMainModule: ({cdnClient, installParameters}:{
        cdnClient:{install:(unknown) => Promise<WindowOrWorkerGlobalScope>},
        installParameters?
    }) => {
        const parameters = installParameters || {}
        const scripts = parameters.scripts || []
        const modules = [
            ...(parameters.modules || []),
            ...mainEntry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/js-playground_APIv02`]
        })
    },
    installAuxiliaryModule: ({name, cdnClient, installParameters}:{
        name: string,
        cdnClient:{install:(unknown) => Promise<WindowOrWorkerGlobalScope>},
        installParameters?
    }) => {
        const entry = secondaryEntries[name]
        if(!entry){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const parameters = installParameters || {}
        const scripts = [
            ...(parameters.scripts || []),
            `@youwol/js-playground#0.2.3-wip~dist/@youwol/js-playground/${entry.name}.js`
        ]
        const modules = [
            ...(parameters.modules || []),
            ...entry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/js-playground/${entry.name}_APIv02`]
        })
    },
    getCdnDependencies(name?: string){
        if(name && !secondaryEntries[name]){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const deps = name ? secondaryEntries[name].loadDependencies : mainEntry.loadDependencies

        return deps.map( d => `${d}#${runTimeDependencies.externals[d]}`)
    }
}
