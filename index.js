import { tweetsData } from './data.js'

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
  console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


const tweetBtn = document.getElementById('tweet-btn')
const feedEl = document.getElementById('feed')
const tweetInput = document.getElementById('tweet-input')


document.addEventListener('click', function(e){
    if(e.target.dataset.likes){
        handleLikeClick(e.target.dataset.likes)
    } else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    } else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    } else if(e.target.id === 'tweet-btn'){
        handleTweetClick()
    }
})


function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

if(targetTweetObj.isLiked){
    targetTweetObj.likes--
}
else {
    targetTweetObj.likes++
}

targetTweetObj.isLiked = !targetTweetObj.isLiked
render()
}

function handleRetweetClick(tweetId){
    const tagetRetweetObj = tweetsData.filter(function(tweet){
       return tweet.uuid ===tweetId
    })[0]

    if(tagetRetweetObj.isRetweeted){
        tagetRetweetObj.retweets--
    }
    else {
        tagetRetweetObj.retweets++
    }
    tagetRetweetObj.isRetweeted = !tagetRetweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId){

document.getElementById(`replies-${replyId}`).classList.toggle ('hidden')

}

function handleTweetClick(){
    if(tweetInput.value){   
    tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/download.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
        tweetInput.value = ''
    }
}


function getFeedHtml (){
    let feedHtml = ``

    tweetsData.forEach(function(tweet){

        let likesIconClass = ``
        let retweetIconClass = ''

        if(tweet.isLiked){
            likesIconClass = `liked`
        }

        if(tweet.isRetweeted){
            retweetIconClass = `retweeted`
        }

        let repliesHtml= ``
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
                <div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
                `
            })
        }else {
        }
    
feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots " data-reply = ${tweet.uuid}></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likesIconClass}" data-likes = ${tweet.uuid}></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet = ${tweet.uuid}></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>

    <div id="replies-${tweet.uuid}">
    ${repliesHtml}
    
    </div>
`
})
return feedHtml
}


function render(){
    feedEl.innerHTML = getFeedHtml()
}

render()