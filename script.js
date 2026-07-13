const message = document.getElementById("blogentry");
const containerpost = document.getElementById("blog");

message.addEventListener('submit', function(event) {
    event.preventDefault();

    const author = document.getElementById("authorint").value;
    const content = document.getElementById("entry").value;

    const actualdate = Date.now();

    const postcard = document.createElement("article");
    postcard.classList.add("postcard");
    postcard.setAttribute('data-time', actualdate)

    postcard.innerHTML = `<h4> By: @${author}</h4> 
                          <p>${content}</p> 
                          <span class="post-date"> published now </span>`;
    containerpost.prepend(postcard);

    message.reset();


})

setInterval(function(){
    const searchcard = document.querySelectorAll(".postcard");

    searchcard.forEach(card =>{
        const spandate = card.querySelector(".post-date");
        const timesubmit = parseInt(card.getAttribute('data-time'));

        const miliseconds = Date.now() - timesubmit;
        const minutes = Math.floor(miliseconds/1000/60);

        if (minutes < 1){
            spandate.textContent = "A moment ago";
        }

        if(minutes == 1){
            spandate.textContent = "1 minute ago";
        }

        if(minutes > 1){
            spandate.textContent = `${minutes} ago`;
        }
    });
}, 6000);