<template>
  <div class="container mt-5">
    <div>
      <div>
        <!-- <label for="description">Post description</label> -->
        <textarea
          v-model="description"
          placeholder="Post description"
          class="form-control shadow-lg"
          id="description"
          rows="3"
        ></textarea>
      </div>
      <div id="editorjs" class="rounded my-4 shadow-lg"></div>
      <button @click="save" type="button" class="btn btn-primary">Save</button>
    </div>
  </div>
</template>

<script>
let EditorJS, Header, List, Image;

if (process.browser) {
  EditorJS = require("@editorjs/editorjs");
  Header = require("@editorjs/header");
  List = require("@editorjs/list");
  Image = require("@editorjs/image");
}

export default {
  layout: "admin",
  middleware: "adminauth",
  data() {
    return {
      description: ""
    };
  },
  mounted() {
    this.editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: process.env.API_URL + "/post/img"
            }
          }
        }
      }
    });
  },
  methods: {
    save() {
      this.editor.save().then(async outputData => {
        if (outputData.blocks.length) {
          let heading, featuredImg;
          for (let i = 0; i < outputData.blocks.length; i++) {
            if (outputData.blocks[i].type === "header") {
              heading = outputData.blocks[i].data.text;
            }
            if (outputData.blocks[i].type === "image") {
              featuredImg = outputData.blocks[i].data.file.url;
            }
            if (heading && featuredImg) break;
          }
          if (heading && featuredImg && this.description) {
            this.$store.dispatch("savePost", {
              heading,
              featuredImg,
              description: this.description,
              author: "John Doe",
              data: outputData.blocks
            });
          }
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.form-control {
  border: none;
}

.btn-outline-primary {
  border: 2px solid #007bff;
}
</style>
