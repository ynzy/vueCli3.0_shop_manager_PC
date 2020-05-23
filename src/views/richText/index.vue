<!--  -->
<template>
  <div>
    <div>
      {{ msg }}
      <tinymce-editor
        v-model="msg"
        :disabled="disabled"
        @onClick="onClick"
        ref="editor"
      ></tinymce-editor>
      <button @click="clear">清空内容</button>
      <button @click="disabled = true">禁用</button>
    </div>
    <div>
      {{ textValue }}
      <TinymceFive ref="editor" v-model="textValue" :disabled="disabled" @onClick="onClick">
      </TinymceFive>
    </div>
  </div>
</template>

<script>
import TinymceEditor from './TinymceEditor.vue'
import TinymceFive from './Tinymce5'
export default {
  data() {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false,
      textValue: 'tinymce5'
    }
  },
  methods: {
    //鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    //清空内容
    clear() {
      this.$refs.editor.clear()
    }
  },
  mounted() {},
  components: {
    TinymceEditor,
    TinymceFive
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
