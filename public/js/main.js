const favoriteButtons = document.querySelectorAll('.favorite_btn')
const unfavoriteButtons = document.querySelectorAll('.unfavorite_btn')

favoriteButtons.forEach(el => {
    el.addEventListener('click', selectFavorite)
})

unfavoriteButtons.forEach(el => {
    el.addEventListener('click', deselectFavorite)
})

async function selectFavorite() {
    const postId = this.parentNode.dataset.id;
    try {
        const response = await fetch('selectFavorite', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                postId: postId
            })
        })
        const data = await response.json()
        location.reload()
    }
    catch(err) {
        console.log(err)
    }
}

async function deselectFavorite() {
    console.log('deselect starts')
    const postId = this.parentNode.dataset.id;
    try {
        const response = await fetch('deselectFavorite', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                postId: postId
            })
        })
        const data = await response.json()
        location.reload()
    }catch(err) {
        console.log(err)
    }
}