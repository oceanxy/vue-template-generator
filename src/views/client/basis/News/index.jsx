import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Form } from 'ant-design-vue'
import TGButtons from '@/views/client/basis/News/components/Buttons'
import TGTable from '@/views/client/basis/News/components/Table'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default Form.create({})({
  data() {
    return {
      loading: false,
      imageUrl: '',
      currentItem: {
        name: ''
      }
    }
  },
  // computed: mapState({
  //   allSiteApps: 'allSiteApps',
  //   allPages: 'allPages',
  //   score() {
  //     return 0
  //   }
  // }),
  watch: {
    async visible(value) {
      if (value) {
        await this.$store.dispatch('getAllPages')
      }
    }
  },
  methods: {
    async onConflictClick() {
      // await dispatch(this.moduleName, 'setVisibleForConflict', true)
    },
    allPathValidator(rule, value, callback) {
      const result = value.filter(item => !item.allPath)

      if (!value.length || result.length) {
        callback(new Error('路径字段不要留空！'))
      }

      callback()
    },
    transformValue(values) {
      return {
        isMonitor: +values.isMonitor,
        isSameGroup: +values.isSameGroup
      }
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
  },
  render() {
    return (
      <BNContainer
        width="100%"
        moduleTitle="我的消息"
        contentClass="bn-news-content"
      >
        <TGButtons />
        <TGTable />
      </BNContainer>
    )
  }
})
