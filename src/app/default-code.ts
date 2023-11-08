export const example = `<!DOCTYPE html>
<html lang="en">
    <head><script src="https://webpm.org/^2.0.4/cdn-client.js"></script></head>
    
    <body id="content"></body>    
    
    <script type="module">
        const client = window['@youwol/cdn-client']
        const {rxDom, rxjs} = await client.install({
            modules:['@youwol/rx-vdom as rxDom'],
            displayLoadingScreen: true,
        })
        const vDOM = {
            innerText: rxjs.timer(0, 1000).pipe( 
                rxjs.map(() => new Date().toLocaleString())
            )            
        }
        document.getElementById('content').appendChild(rxDom.render(vDOM))
    </script>
</html>
`
