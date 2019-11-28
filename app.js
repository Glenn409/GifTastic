
let searchArray = ['rabbits','llamas','cats','dogs','penguins','giraffes','dolphins']

function updateHeader(prevSearch){
    if(prevSearch !== false){
        searchArray.push(prevSearch)
    } 
    $('.header').empty()
    searchArray.forEach(x => $('.header').append(`<button class='header-button'>${x}</button`))        
}

function searchGif(searchTerm){
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=RdJzJjDONSou7k7M7F47TcPn4ImDBsAN&q=${searchTerm}&limit=10&offset=0&rating=G&lang=en`)
    .then(function(result){
        let arrayOfGifs = result.data.data
        // console.log(arrayOfGifs[0].images)
        $('.gif_display').empty()
        for(let i = 0; i < arrayOfGifs.length;i++){
            let imageContainer = $(`<div>`)
            imageContainer.addClass('gif_box')
            let stillImage = arrayOfGifs[i].images.fixed_height_still.url
            let animatedImage = arrayOfGifs[i].images.fixed_height.url
            imageContainer.append(`<img class='gifImage' src='${stillImage}' data-state='still' data-still='${stillImage}' data-animate=${animatedImage}'/>`)
            $('.gif_display').append(imageContainer)
        }
    })
}


$(document).ready(function(){
    updateHeader(false)
});

$('.search').on('click',function(){
    let searchTerm = $('#searchInput').val().trim()
    if(searchTerm === ''){
    } else {
        searchGif(searchTerm)
        updateHeader(searchTerm)
    }
})
$(document).on('click','.gifImage',function(){
    if($(this).attr('data-state') === 'still'){
        $(this).attr('src',$(this).attr('data-animate'))
        $(this).attr('data-state', 'running')
        
    } else {
        console.log('switching to still')
        $(this).attr('src',$(this).attr('data-still'))
        $(this).attr('data-state','still')
    }
})

$(document).on('click','.header-button',function(){
    let searchTerm = $(this).html()
    searchGif(searchTerm)
})