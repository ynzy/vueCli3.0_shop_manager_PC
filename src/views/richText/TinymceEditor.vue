<!--  -->
<template>
  <div>
    <editor
      api-key="nnao9q4mc0w713lhkwwynpjh7obqypbzfsttf3a61kk7kdt4"
      v-model="myValue"
      :init="init"
      :disabled="disabled"
    />
    <el-button @click="onClick">点击获取文本</el-button>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  props: {
    //传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table textcolor wordcount contextmenu'
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    }
  },
  data() {
    return {
      //初始化配置
      init: {
        // language_url: '/static/tinymce/langs/zh_CN.js',
        // language: 'zh_CN',
        // skin_url: '/static/tinymce/skins/ui/oxide',
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: true,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      },
      myValue: this.value
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    //需要什么事件可以自己增加
    onClick(e) {
      console.log(this.myValue)

      // this.$emit('onClick', e, tinymce)
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    }
  },
  mounted() {},
  components: {
    editor: Editor
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
