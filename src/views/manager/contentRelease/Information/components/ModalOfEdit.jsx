import '../assets/styles/index.scss'
import { Col, DatePicker, Form, Input, InputNumber, Row, Switch, TreeSelect } from 'ant-design-vue'
import Editor from '@/components/Editor'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadFile from '@/components/BNUploadFile'
import BNUploadPictures from '@/components/BNUploadPictures'
import { createNamespacedHelpers, mapGetters } from 'vuex'
import moment from 'moment'

const { mapActions: commonMapActions } = createNamespacedHelpers('common')

export default Form.create({})({
  mixins: [forFormModal()],

  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 800,
        wrapClassName: 'bnm-modal-contentrelease-information-form'
      }
    }
  },
  computed: {
    // ...commonMapState(['informationTypes'])
    ...mapGetters({ getState: 'getState' }),
    informationTypes() {
      return this.getState('informationTypes', 'common')
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
      const data = { ...values }

      data.articleId = this.currentItem.id || ''
      data.publishTime = data?.publishTime?.format('YYYYMMDDHHmmss') || ''
      data.coverImg = data.coverImg
        .map(item => {
          return item?.response?.data[0]?.key ?? item.key
        })
        .join(',')

      data.attachmentList = data.attachmentList.map(item => {
        return item?.response?.data[0] ?? item
      })

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
    const getFileList = () => {
      return (this.currentItem.attachmentList || []).map((item, index) => {
        return {
          ...item,
          url: item.path,
          uid: index,
          status: 'done',
          name: item.fileName
        }
      })
    }
    const getImgList = () => {
      let result = []

      if (this.currentItem.coverImg) {
        result = [
          {
            uid: '0',
            url: this.currentItem.coverImgStr,
            key: this.currentItem.coverImg,
            status: 'done',
            name: this.currentItem.coverImg?.substring(this.currentItem.coverImg?.lastIndexOf('/'))
          }
        ]
      }

      return result
    }

    return (
      <DragModal {...attributes}>
        <Form class="" colon={false}>
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="封面图">
                {this.form.getFieldDecorator('coverImg', { initialValue: getImgList() })(
                  <BNUploadPictures limit={1}></BNUploadPictures>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="标题">
                {this.form.getFieldDecorator('articleTitle', {
                  initialValue: this.currentItem.articleTitle ?? undefined,
                  rules: [
                    {
                      required: true,
                      message: '请输入标题!',
                      trigger: 'blur'
                    }
                  ]
                })(<Input placeholder="请输入" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="所属类型">
                {this.form.getFieldDecorator('catId', {
                  initialValue: this.currentItem.catId ?? undefined,
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
                  ></TreeSelect>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="发布时间">
                {this.form.getFieldDecorator(
                  'publishTime',
                  { initialValue: this.currentItem.publishTime ? moment(this.currentItem.publishTimeStr) : undefined }
                )(<DatePicker show-time placeholder="请选择" allowClear></DatePicker>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="来源">
                {this.form.getFieldDecorator('fromTo', { initialValue: this.currentItem.fromTo ?? undefined })(
                  <Input placeholder="请输入" allowClear></Input>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="作者">
                {this.form.getFieldDecorator('author', { initialValue: this.currentItem.author ?? undefined })(
                  <Input placeholder="请输入" allowClear></Input>
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="描述">
                {
                  this.form.getFieldDecorator(
                    'description',
                    { initialValue: this.currentItem.description ?? undefined }
                  )(
                    <Input.TextArea
                      placeholder="请输入"
                      autoSize={{ minRows: 6 }}
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="内容">
                {this.form.getFieldDecorator(
                  'htmlContent',
                  { initialValue: this.currentItem.htmlContent ?? undefined }
                )(<Editor></Editor>)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="附件">
                {this.form.getFieldDecorator('attachmentList', { initialValue: getFileList() })(
                  <BNUploadFile></BNUploadFile>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="排序">
                {this.form.getFieldDecorator('sortIndex', { initialValue: this.currentItem.sortIndex ?? 0 })(
                  <InputNumber placeholder="请输入" style={{ width: '100%' }}></InputNumber>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态">
                {this.form.getFieldDecorator('status', {
                  initialValue: this.currentItem.status === undefined ? true : this.currentItem.status === 1,
                  valuePropName: 'checked'
                })(<Switch />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
