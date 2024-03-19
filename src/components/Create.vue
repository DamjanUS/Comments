<template>
  <div>
    <input v-model.trim="driveUrl" />
    <button @click="submit">Submit</button>
  </div>
</template>

<script>
import { createDocument } from "../firebase";

export default {
  data() {
    return {
      driveUrl: "",
    };
  },
  methods: {
    async submit() {
      const x = await createDocument("urls", {
        driveUrl: this.driveUrl,
        comments: [],
      });
      console.log(x);
    },
  },
};
</script>
