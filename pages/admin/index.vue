<template>
  <div class="container mt-5">
    <div>
      <div class="mb-5">
        <!-- <label for="description">Post description</label> -->
        <textarea
          placeholder="Post description"
          class="form-control shadow-lg"
          id="description"
          rows="3"
        ></textarea>
      </div>
      <div id="editorjs" class="rounded shadow-lg"></div>
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
              byFile: process.env.baseUrl + "/api/admin/post/img"
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
          console.log(outputData.blocks);
          let heading;
          for (let i = 0; i < outputData.blocks.length; i++) {
            if (outputData.blocks[i].type === "header") {
              heading = outputData.blocks[i].data.text;
              break;
            }
          }
        } else {
          console.log("Nooo");
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
</style>
