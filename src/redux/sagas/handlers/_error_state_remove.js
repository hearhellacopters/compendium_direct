export function _error_remove (file) {
    const errors = window.localStorage.getItem('err_mes')
    if(errors!= undefined){
        const objects = JSON.parse(errors)
        delete objects[file]
        window.localStorage.setItem('err_mes', JSON.stringify(objects))
    }
}