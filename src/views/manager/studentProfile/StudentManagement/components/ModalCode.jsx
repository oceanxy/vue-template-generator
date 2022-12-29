import '../assets/styles/index.scss'
import { Form, Button } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import apis from '@/apis'


export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibilityFieldName: 'visibilityOfCode',
      imgCodeUrl: '',
      modalProps: {
        width: 380,
        centered: true,
        footer: (
          <div>
            <Button
              onClick={() => this.codeDownload()}
              type="primary"
              icon="download"
            >
              下载
            </Button>
            <Button

              onClick={() => this.codePrint()}
              type="primary"
              icon="printer"
            >
              打印
            </Button>
          </div>
        ),
        wrapClassName: 'bnm-modal-edit-user-form'
      },
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName)
        }
      }
    }
  },
  methods: {
    // 下载二维码
    codeDownload() {
      const imgsrc = this.imgCodeUrl
      const name = this.currentItem.fullName
      //下载图片地址和图片名
      const image = new Image()

      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        const canvas = document.createElement('canvas')

        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')

        context.drawImage(image, 0, 0, image.width, image.height)
        const url = canvas.toDataURL('image/png') //得到图片的base64编码数据'
        const a = document.createElement('a') // 生成一个a元素
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }) // 创建一个单击事件

        a.download = name || 'photo' // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgsrc
    },
    // 打印二维码
    codePrint() {

      let iframe = document.getElementById('print-iframe')

      if (!iframe) {
        const print = document.getElementById('print').innerHTML

        iframe = document.createElement('iframe')
        let doc = null

        iframe.setAttribute('id', 'print-iframe')
        iframe.setAttribute('style', 'position: absolute;width: 0px;height: 0px;left: -500px;top: -500px;')
        document.body.appendChild(iframe)

        doc = iframe.contentWindow.document
        doc.write('<style media ="print">@page{size:auto;margin:0mm;}</style>')
        doc.write('<div>' + print + '</div>')
        iframe.contentWindow.focus()
      }

      setTimeout(() => { iframe.contentWindow.print() }, 50)

      if (navigator.userAgent.indexOf('MSIE') > 0) {
        document.body.removeChild(iframe)
      }

    },
    async onCodeSelf() {
      const studentId = this.currentItem.id
      const res = await apis.getCodeSelf({ studentId: studentId })

      this.imgCodeUrl = URL.createObjectURL(res)


    }
  },
  watch: {
    'modalProps.visible'(value) {
      if (value) {
        this.onCodeSelf()
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <div id="print">
          <img class='imgCode' src={this.imgCodeUrl}></img>
        </div>
      </DragModal >
    )
  }
})
