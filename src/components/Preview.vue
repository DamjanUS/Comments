<template>
  <div>
    <video @timeupdate="videoUpdate" width="640" height="320" controls>
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <div>
      <div v-for="(comment, idx) in filteredComments" :key="idx">
        {{ comment.comment }} from {{ comment.name }}
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
const API_KEY = "AIzaSyDN0bez1PSvU1Xb5LY5N1fFvIM1GbXBOv0";

const extractFileId = (url) => {
  const match = url.match(/\/file\/d\/([^/?#]+)\/?/);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};

export default {
  props: {
    entry: Object,
  },
  data() {
    return {
      videoTime: 0,
    };
  },
  computed: {
    filteredComments() {
      return this.entry.comments.filter((comment) => {
        return this.videoTime >= comment.from && this.videoTime <= comment.to;
      });
    },
    videoUrl() {
      const fileId = extractFileId(this.entry.driveUrl);
      const c = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
      return c;
    },
  },
  methods: {
    videoUpdate(event) {
      this.videoTime = event.target.currentTime;
    },
  },
};
</script>
