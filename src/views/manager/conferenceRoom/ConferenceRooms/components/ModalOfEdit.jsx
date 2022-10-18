import '../assets/styles/index.scss'
import { Checkbox, Col, Form, Input, InputNumber, Row, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { createNamespacedHelpers } from 'vuex'

const { mapState: commonMapState, mapActions: commonMapActions } = createNamespacedHelpers('common')

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 700,
        wrapclass: 'bnm-modal-edit-conference-room-manage'
      }
    }
  },
  computed: {
    ...commonMapState(['roomEquipment']),
    images() {
      let result = []

      if (this.currentItem.imgList) {
        result = this.currentItem.imgList.map((item, index) => {
          return {
            uid: index,
            url: item.path,
            key: item.key,
            name: item.path?.substring(item.path?.lastIndexOf('/')),
            status: 'done'
          }
        })
      }

      return result
    },
    facilityList() {
      let result = []

      if (this.currentItem.facilityList) {
        result = this.currentItem.facilityList.map(item => item.id)
      }

      return result
    }
  },
  async mounted() {
    if (this.roomEquipment.length === 0) {
      await this.getFacilityList()
    }
  },
  methods: {
    ...commonMapActions(['getFacilityList']),
    customDataHandler(values) {
      const data = { ...values }

      data.id = this.currentItem?.id ?? ''
      data.imgs = data.imgs.map(item => item?.response?.data[0]?.key ?? item.key).join()
      data.facilityList = data.facilityList1.map(item => this.roomEquipment.find(item2 => item2.id === item))

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
          class=""
          colon={false}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="图片">
                {
                  this.form.getFieldDecorator('imgs', { initialValue: this.images })(
                    <BNUploadPictures />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="房号">
                {
                  this.form.getFieldDecorator('roomNo', {
                    initialValue: this.currentItem.roomNo || undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入房号!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入房号"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="配套设施">
                {
                  this.form.getFieldDecorator('facilityList1', { initialValue: this.facilityList })(
                    <Checkbox.Group>
                      {
                        this.roomEquipment.map(item => <Checkbox value={item.id}>{item.fullName}</Checkbox>)
                      }
                    </Checkbox.Group>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="排序">
                {
                  this.form.getFieldDecorator('sortIndex', { initialValue: this.currentItem.sortIndex || undefined })(
                    <InputNumber
                      placeholder="请输入排序"
                      allowClear
                      style={{ width: '100%' }}
                    />
                  )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态">
                {
                  this.form.getFieldDecorator('status', {
                    initialValue: this.currentItem.status === 1,
                    valuePropName: 'checked'
                  })(
                    <Switch />
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
