import '../assets/styles/index.scss'
import { Form, Button, Space, Upload } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import apis from '@/apis'
import service from '@/utils/request'


export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfImport',
      modalProps: {
        width: 880,
        footer: false,
        title: '全局',
        wrapClassName: 'bnm-modal-edit-user-form'
      },
    }
  },

  computed: {
    ...mapGetters({ getState: 'getState' }),
    // currentItem() {
    //   return this.getState('currentItem', this.moduleName)
    // },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibleField)
        }
      }
    }
  },
  methods: {
    // 上传文件
    unloadFile(info) {
      console.log(info)
    }
  },
  watch: {
    'modalProps.visible'(value) {
      if (value) {
        console.log(service())
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <br></br>
        <Space>
          <Upload
            name="file"
            action={`${service.baseURL}/personnel/student/importFile`}
            onChange={this.unloadFile}
          >上传数据文件</Upload>
          <a href='#'>下载模板文件</a>
        </Space>
        <div class="well" style="margin-top: 40px;">
          <p>1、请先下载模板文件，并在模板文件中编辑好数据后上传；</p>
          <p>2、上传的数据文件支持XLS、XLSX格式；</p>
          <p>3、Excel文件中的数据请勿添加任何格式；</p>
          <p>4、因数据文件需要验证，需持续一段时间，请耐心等待，不要关闭页面；</p>
          <p><span style="color: red">5、警告：此为全量导入！！会覆盖所有数据，请确认数据完整性与正确性，保证每个班级的学生信息完整，确认是整班导入，如有错误数据，请把错误数据改正后选择局部导入</span></p>
        </div>
      </DragModal >
    )
  }
})
