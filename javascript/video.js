// 1. Fetch, load and show catagories in html


// create loadCatagories

const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
};


// create LoadVideos

const loadvideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
}


// create displayCatagories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');

    categories.forEach(item => {
        console.log(item);

        const button = document.createElement('button');
        button.classList = 'btn focus:bg-red-400 text-black';
        button.innerText = item.category;

        categoryContainer.append(button)
    })
};




// created displayVideos

const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('videos');

    videos.forEach(video => {
        console.log(video);


        const card = document.createElement('div');
        card.classList = " card card-compact "

        card.innerHTML =
            `
            <figure class= "h-[200px] relative">
                <img class= "h-full w-full object-cover"
                src=${video.thumbnail}
                alt="video.thumbnail" />
                ${video.others.posted_date?.length === 0 ? "" : `<span class= "absolute right-2 bottom-2 bg-gray-800 text-slate-300 font-light px-5 py-1 rounded-lg ">${video.others.posted_date}<span/>`}               
            </figure>
            <div class="px-0 py-4 flex gap-4 ">
                <div>
                <img class="w-[40px] h-[40px] rounded-full object-cover" src=${video.authors[0].profile_picture} alt="profile_picture">
                </div>

                <div class="space-y-1">
                <h2 class="card-title font-bold">${video.title}</h2>
                <div class="flex gap-2 items-center">
                <p>${video.authors[0].profile_name}</p>
                ${video.authors[0].verified === true ? `<img class="w-[20px] h-[20px]" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="verify_icon"/>` :""} 
                </div>
                <p>${video.others.views} views</p>
                </div>

                
            </div>
            `;

            videoContainer.append(card);



    })


};





loadCategories();
loadvideos();