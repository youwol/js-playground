export const example = `<!DOCTYPE html>
<html lang="en">
    <head><script src="https://webpm.org/^2.2.0/webpm-client.js"></script></head>
    
    <body id="content"></body>    
    
    <script type="module">
        const {rxDom, rxjs} = await webpm.install({
            modules:[
                '@youwol/rx-vdom as rxDom',
                'rxjs#^7.5.6 as rxjs'],
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
