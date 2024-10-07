// 1. Fetch, load and show catagories in html


//  get time 
function getTime(time){
   
    const hour = parseInt(time / 3600);  
    let remainingSeconds = time % 3600;
    const minute = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return ` ${hour} hours ${minute} minutes ${remainingSeconds} seconds ago`;
}

// create loadCatagories

const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
};


// create LoadVideos

const loadvideos = (searchText ='') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
}

// remove active button function 
const removeActiveButton = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (const btn of buttons){
        btn.classList.remove("active")
    }
} 


const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {


        //  all  button activeclass are hidden
        removeActiveButton();


        // only click button activeclass is add
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active")
        displayVideos(data.category)
    })
    .catch(error => console.log(error))
}


// create showVideos by id


// create displayCatagories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');

    categories.forEach(item => {
        console.log(item);

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = 
        `
        <button id = "btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class = "btn  text-black category-btn">
            ${item.category}
        </button>
        `;

        categoryContainer.append(buttonContainer)
    })
};




// created displayVideos

const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if(videos.length === 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML =
        `
        <div class = " min-h-[300px] flex flex-col gap-5 justify-center items-center"> 
        <img src="./assets/Icon.png" alt="Icon">
        <h1 class= "font-bold text-gray-800 text-4xl text-center leading-tight">Oops!! Sorry, There is no <br> content here</h1>
        </div>
        `;
    }
    else {
        videoContainer.classList.add('grid')
    }
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
                ${video.others.posted_date?.length === 0 ? "" : `<span class= "absolute right-2 bottom-2 bg-gray-800 text-xs text-slate-300 font-light px-5 py-2 rounded-lg ">${getTime(video.others.posted_date)}<span/>`}               
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
                    <p></p>
                </div>

                
            </div>
            `;

            videoContainer.append(card);



    })


};

// search text button 
const searchText = document.getElementById('search-text').addEventListener('keyup', (event)=> {
    loadvideos(event.target.value);
});




loadCategories();
loadvideos();