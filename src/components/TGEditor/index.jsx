/**
 * 富文本编辑器（基于 wangEditor 5）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-04-19 周三 09:59:35
 */

import '@wangeditor/editor/dist/css/style.css'
import './index.scss'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { message } from 'ant-design-vue'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import config from '@/config'

const appName = getFirstLetterOfEachWordOfAppName()

// 图片和视频上传共同配置部分
const fileOrVideoCommonConfig = {
  // form-data fieldName ，默认值 'wangeditor-uploaded-video'
  fieldName: 'file',
  // 自定义增加 http  header
  headers: {token: localStorage.getItem(`${appName}-${config.tokenConfig.fieldName}`)},
  // 上传之前触发
  onBeforeUpload(file) {
    // file 选中的文件，格式如 { key: file }
    message.loading({
      content: '上传中...',
      duration: 0
    })
  },
  // 单个文件上传成功之后
  onSuccess(file, res) {
    message.destroy()
  },
  // 单个文件上传失败
  onFailed(file, res) {
    message.error(`${file.name} 上传失败，${res?.message}`)
    setTimeout(function() {
      message.destroy()
    }, 2000)
  },
  // 上传错误，或者触发 timeout 超时
  onError(file, err, res) {
    message.error(`${file.name} 上传出错，${err}，${res?.message ?? '上传超时'}`)
    setTimeout(function() {
      message.destroy()
    }, 2000)
  },
  // 自定义插入
  customInsert(res, insertFn) {
    const {status, data} = res

    // 从 res 中找到 url alt href ，然后插入图片
    if (status && data[0]) {
      insertFn(data[0].path, data[0].fileName, data[0].key)
    }
  }
}

export default {
  name: 'TGEditor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    /**
     * 如果你不想使用 wangEditor 自带的上传功能，例如你要上传到阿里云 OSS
     * 可以通过 customUpload 来自定义上传
     */
    customUpload: {
      type: Function,
      default: null
    },
    maxLength: {
      type: Number,
      default: 30000
    },
    toolbarConfig: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: Number,
      default: 566
    }
  },
  data() {
    return {
      editor: null,
      editorConfig: {
        placeholder: '请输入内容...',
        maxLength: this.maxLength,
        MENU_CONF: {
          // 上传图片的配置
          uploadImage: {
            ...fileOrVideoCommonConfig,
            // 上传地址
            server: this.$config.imageUploadPath,
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 20 * 1024 * 1024, // 20M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 10,
            timeout: this.$config.timeout, // 5 秒
            // 自定义上传
            customUpload: this.customUpload
          },
          uploadVideo: {
            ...fileOrVideoCommonConfig,
            // 上传地址
            server: this.$config.videoUploadPath,
            // 单个文件的最大体积限制，默认为 10M
            maxFileSize: 20 * 1024 * 1024, // 100M
            timeout: this.$config.timeout, // 5 秒
            // 最多可上传几个文件，默认为 5
            maxNumberOfFiles: 3
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange(editor) {
      if (editor.isEmpty() && this.value) {
        this.$emit('change', '')
      } else {
        this.$emit('change', editor.getHtml())
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.html = value
        }

        this.editorConfig.readOnly = this.disabled
      }
    }
  },
  beforeDestroy() {
    const editor = this.editor

    if (editor === null) return

    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  render() {
    return this.height
      ? (
        <div
          class={`tg-editor ant-input${this.disabled ? ' disabled' : ''}`}
          style={{height: this.height + 'px'}}
        >
          <Toolbar
            class={'tg-editor-toolbar'}
            editor={this.editor}
            defaultConfig={this.toolbarConfig}
            mode={this.mode}
          />
          <Editor
            class={'tg-editor-content'}
            vModel={this.html}
            defaultConfig={this.editorConfig}
            mode={this.mode}
            max
            onOnCreated={this.onCreated}
            onOnChange={this.onChange}
          />
        </div>
      ) : null
  }
}
