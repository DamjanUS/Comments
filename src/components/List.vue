<template>
  <div>
    <div v-for="(entry, idx) in entries" :key="idx">
      <div>
        <span>{{ entry.driveUrl }}</span>
        <button @click="preview(idx)">Preview</button>
      </div>
    </div>
    <br />
    <button @click="refresh">Refresh</button>
    <br /><br />
    <form>
      <label for="text">Name</label>
      <input type="text" v-model="newComment.name" />
      <label for="number">From</label>
      <input type="number" v-model="newComment.from" />
      <label for="number">To</label>
      <input type="number" v-model="newComment.to" />
      <label for="text">Comment</label>
      <input type="text" v-model="newComment.comment" />
      <br />
      <br />
      <button type="button" @click="comments">Submit</button>
    </form>
    <br />
    <Preview v-if="inPreview != null" :entry="entries[inPreview]" />
  </div>
</template>

<script>
import { getDocuments, updateDocument } from "../firebase";
import Preview from "./Preview.vue";

export default {
  mounted() {
    this.fetchList();
  },
  data() {
    return {
      entries: [],
      inPreview: null,
      newComment: {
        name: "",
        from: null,
        to: null,
        comment: "",
      },
    };
  },
  methods: {
    async fetchList() {
      const entries = await getDocuments("urls");
      this.entries = entries;
    },
    refresh() {
      this.fetchList();
    },
    preview(idx) {
      this.inPreview = idx;
    },
    comments() {
      if (this.inPreview === null) {
        return;
      }
      this.entries[this.inPreview].comments.push(this.newComment);
      this.newComment = {
        name: "",
        from: null,
        to: null,
        comment: "",
      };
      updateDocument(
        "urls",
        this.entries[this.inPreview].id,
        this.entries[this.inPreview]
      );
    },
  },
  components: {
    Preview,
  },
};
</script>
