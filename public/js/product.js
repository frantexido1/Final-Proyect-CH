const socket = io();

const deleteProduct = (id) => {
    fetch(`/api/products/${id}`, {
        method: 'DELETE',
    })
}
