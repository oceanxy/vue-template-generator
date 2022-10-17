<template>
  <VueEditor
    v-model="htmlForEditor"
    @text-change="textChange"
  />
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  props: ['value'],
  components: { VueEditor },
  data() {
    return { htmlForEditor: '' }
  },
  methods: {
    textChange() {
      this.$emit('input', this.htmlForEditor)
      this.$emit('change', this.htmlForEditor)
    }
    // handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
    //   const formData = new FormData()

    //   formData.append('file', file)
    //   const itemJson = {
    //     file: file,
    //     progressEvent: function () {
    //       //
    //     },
    //     success(e) {
    //       if (e.status) {
    //         const data = e.data
    //         const url = data[0].key

    //         Editor.insertEmbed(cursorLocation, 'image', `${appConfig.imgUrl}${url}`)
    //         resetUploader()
    //       }
    //     }
    //   }
    //   const fu = new FileUpload({
    //     formData: formData,
    //     progress: itemJson.progressEvent.bind(itemJson)
    //   })

    //   fu.uploadImg(itemJson.success.bind(itemJson))
    // }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.htmlForEditor = value
      }
    }
  }
}
</script>
