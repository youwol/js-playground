export const example = `
return async ({cdnClient}) => {
    await cdnClient.install({
    // bootstrap will come with its dependencies installed first (e.g. popper.js)
        modules:['bootstrap#^4.0.0'],
    // CSS are explicitly imported 
        css: ['bootstrap#^4.4.0~bootstrap.min.css']
    })
    const div = document.createElement('div')
    div.innerHTML =  \`
<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown button
    </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item">Action</a>
    <a class="dropdown-item">Another action</a>
    <a class="dropdown-item">Something else here</a>
  </div>
</div>\`
    return div
}
`
