
// Formulario de ingreso de productos
let form = document.getElementById('productForm')
const handleSubmit = (e,form,route)=>{
    e.preventDefault()
    let formData = new FormData(form)
    fetch(route,{
        method:'POST',
        body:formData
    }).then(r=>r.json()).then(json=>console.log(json))
    form.reset()
}

form.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/products'))