import '../assets/styles/index.scss'
import { DatePicker, Form, Input, InputNumber, Switch, TreeSelect } from 'ant-design-vue'
import Editor from '@/components/Editor'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadFile from '@/components/BNUploadFile'
import BNUploadPictures from '@/components/BNUploadPictures'
import { createNamespacedHelpers, mapGetters } from 'vuex'
import moment from 'moment'
import { cloneDeep } from 'lodash'

const { mapActions: commonMapActions } = createNamespacedHelpers('common')

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 1200,
        destroyOnClose: true,
        wrapclass: 'bnm-modal-contentrelease-information-form'
      }
    }
  },
  computed: {
    // ...commonMapState(['informationTypes'])
    ...mapGetters({ getState: 'getState' }),
    informationTypes() {
      return this.getState('informationTypes', 'common')
    },
    getImgList() {
      let result = []

      if (this.currentItem.coverImg) {
        result = [
          {
            uid: '0',
            url: this.currentItem.coverImgStr,
            key: this.currentItem.coverImg,
            status: 'done',
            name: this.currentItem.coverImg?.substring(this.currentItem.coverImg?.lastIndexOf('/')) ?? ''
          }
        ]
      }

      return result
    },
    getFileList() {
      return (this.currentItem.attachmentList || []).map((item, index) => {
        return {
          ...item,
          url: item.path,
          uid: index,
          key: item.key,
          status: 'done',
          name: item.fileName
        }
      })
    }
  },
  mounted() {
    if (this.informationTypes.length === 0) {
      this.getInformationTypes()
    }
  },
  methods: {
    ...commonMapActions(['getInformationTypes']),
    customDataHandler(values) {
      const data = cloneDeep(values)

      data.articleId = this.currentItem.id || ''
      data.publishTime = data?.publishTime?.format('YYYYMMDDHHmmss') || ''
      data.coverImg = data.coverImg.map(item => item?.response?.data[0]?.key ?? item.key).join()
      data.attachmentList = data.attachmentList.map(item => item?.response?.data[0] ?? item)

      return data
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="封面图">
            {
              this.form.getFieldDecorator('coverImg', { initialValue: this.getImgList })(
                <BNUploadPictures limit={1} />
              )
            }
          </Form.Item>
          <Form.Item
            label="标题"
            class={'one-third'}
          >
            {
              this.form.getFieldDecorator('articleTitle', {
                initialValue: this.currentItem.articleTitle,
                rules: [
                  {
                    required: true,
                    message: '请输入标题!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="所属类型"
            class={'one-third'}
          >
            {
              this.form.getFieldDecorator('catId', {
                initialValue: this.currentItem.catId,
                rules: [
                  {
                    required: true,
                    message: '请选择所属类型!',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  treeData={this.informationTypes}
                  show-search
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  treeNodeFilterProp={'title'}
                  style="width: 100%"
                  placeholder="请选择"
                  allow-clear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="发布时间"
            class={'one-third'}
          >
            {
              this.form.getFieldDecorator(
                'publishTime',
                {
                  initialValue: this.currentItem.publishTime
                    ? moment(this.currentItem.publishTimeStr)
                    : undefined
                }
              )(
                <DatePicker
                  show-time
                  placeholder="请选择"
                  allowClear
                  style="width: 100%"
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="来源"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('fromTo', { initialValue: this.currentItem.fromTo })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="作者"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('author', { initialValue: this.currentItem.author })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator(
                'description',
                { initialValue: this.currentItem.description }
              )(
                <Input.TextArea
                  placeholder="请输入"
                  autoSize={{ minRows: 6 }}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="内容">
            {
              this.form.getFieldDecorator('htmlContent', { initialValue: this.currentItem.htmlContent })(
                <Editor />
              )
            }
          </Form.Item>
          <Form.Item label="附件">
            {
              this.form.getFieldDecorator('attachmentList', { initialValue: this.getFileList })(
                <BNUploadFile />
              )
            }
          </Form.Item>
          <Form.Item
            label="排序"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('sortIndex', { initialValue: this.currentItem.sortIndex || 0 })(
                <InputNumber
                  placeholder="请输入"
                  style={{ width: '100%' }}
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="状态"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('status', {
                initialValue: this.currentItem.status === undefined ? true : this.currentItem.status === 1,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
