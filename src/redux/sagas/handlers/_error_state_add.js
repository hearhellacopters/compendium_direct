export function _error (file,code) {
    const errors = window.localStorage.getItem('err_mes')
    if(errors!= undefined){
        const objects = JSON.parse(errors)
        Object.assign(objects,{[file]:code})
        window.localStorage.setItem('err_mes', JSON.stringify(objects))
    }
}