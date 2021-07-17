<template>
  <div class="page-container">
    <h1>FOLLOWING FEED!!!</h1>

    <div class="stories-container">
      <ul
        class="story-list"
        v-for="(story) in this.photoStoriesToShow"
        :key="story.id"
      >
        <li>
          <div class="single-story-container">
            <div class="story-user-photo-name">
              <div class="small-profile-img-story">
                <img :src="story.owner.imgUrl" alt="ERROR!" />
              </div>
              <p class="user-name-story">{{ story.owner.username }}</p>
            </div>
              <div class="main-image-story">
                <img :src="story.imgUrl" alt="ERROR!" />
              </div>
              <div class="story-comment-like">
              <svg aria-label="Like" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
              <svg aria-label="Comment" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
              <p>liked by {{story.likedBy[0].fullname}} and {{story.likedBy.length-1}} others</p>
              </div>
              <div class="story-text">
                <p>{{ story.txt }}</p>
              </div>
              <div class="story-comments">
                <p>{{story.comments[0].txt}}</p>
                <p class="view-all-comments">View all {{story.comments.length}} comments</p>
              </div>
              <div class="story-how-long-ago">
                {{timeDifference(Date.now(), story.createdAt)}}
              </div>
              
          </div>
        </li>
      </ul>
      <!-- <img :src="require(`${photoStoriesToShow[0].imgUrl}`)" alt="" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storyText: this.$store.state.photoStories[0].txt,
      numStoriesToShow: 6,
      photoStories: [],
      photoStoriesToShow: [],
      users: [],
      userCommentTxt: '',
    };
  },
  methods: {
    loadPhotoStories() {
      this.photoStories = this.$store.getters.getPhotoStories;
    },
    getStoryImgUrl(idx) {
      return this.photoStoriesToShow[idx].imgUrl;
    },
    getUserForStory(ownerId) {
      return this.users.find((user) => {
        user.id === ownerId;
      });
    },
    loadUsers() {
      this.users = this.$store.getters.getUsers;
    },

    loadLimitedPhotoStories() {
      this.photoStoriesToShow = this.photoStories.slice(
        0,
        this.numStoriesToShow
      );
    },
    timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
},
  },
  // computed: {
  // },
  created() {
    this.loadPhotoStories();
    this.loadLimitedPhotoStories();
    this.loadUsers();
  },
};
</script>

<style>
</style>