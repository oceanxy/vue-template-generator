import '../assets/styles/index.scss'
import { Checkbox, DatePicker, Form, Input, InputNumber, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import moment from 'moment'
import BNUploadPictures from '@/components/BNUploadPictures'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 810 } }
  },
  computed: {
    /**
     * 回显图片
     * @returns {*|*[]}
     */
    fileList() {
      return this.currentItem.coverImg
        ? [
          {
            uid: 'coverImg',
            key: this.currentItem.coverImg,
            url: this.currentItem.coverImgStr,
            status: 'done',
            name: this.currentItem.coverImg?.substring(this.currentItem.coverImg?.lastIndexOf('/'))
          }
        ] : []
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customDataHandler: values => {
            values.activityId = this.currentItem.activityId
            values.entTime = values.endTime
            values.coverImg = values.coverImg[0]?.response?.data[0].key ?? values.coverImg[0]?.key ?? ''
            values.participationObjs = values.participationObjs.map(item => ({
              id: item,
              name: item === 1 ? '个人' : '公司/团队'
            }))

            return values
          }
        })
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-from-grid'}>
        <Form class="bnm-form-grid">
          <Form.Item label="封面图片">
            {
              this.form.getFieldDecorator('coverImg', { initialValue: this.fileList })(
                <BNUploadPictures limit={1} />
              )
            }
          </Form.Item>
          <Form.Item label="活动名称">
            {
              this.form.getFieldDecorator('activityName', {
                initialValue: this.currentItem.activityName,
                rules: [
                  {
                    required: true,
                    message: '请输入活动名称!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入活动名称"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="活动时间">
            {
              this.form.getFieldDecorator('dateRange', {
                initialValue: [
                  this.currentItem.startTimeStr ? moment(this.currentItem.startTimeStr) : undefined,
                  this.currentItem.entTimeStr ? moment(this.currentItem.entTimeStr) : undefined
                ],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请选择时间范围!',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker.RangePicker
                  showTime
                  style={{ width: '100%' }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="活动场所">
            {
              this.form.getFieldDecorator('activityPlace', {
                initialValue: this.currentItem.activityPlace,
                rules: [
                  {
                    required: true,
                    message: '请输入活动场所!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入活动场所"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="主办单位">
            {
              this.form.getFieldDecorator('organizer', {
                initialValue: this.currentItem.organizer,
                rules: [
                  {
                    required: true,
                    message: '请输入主办单位!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入主办单位"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="参与对象">
            {
              this.form.getFieldDecorator(
                'participationObjs',
                { initialValue: this.currentItem.participationObjIds || [] }
              )(
                <Checkbox.Group>
                  <Checkbox value={1}>个人</Checkbox>
                  <Checkbox value={2}>公司/团队</Checkbox>
                </Checkbox.Group>
              )
            }
          </Form.Item>
          {/*<Form.Item label="资讯链接">
            {
              this.form.getFieldDecorator('articleIdList', { initialValue: this.currentItem.articleIdList || [] })(
                <MultiInput placeholder="请输入资讯链接" />
              )
            }
          </Form.Item>*/}
          <Form.Item
            label="排序"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序值!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入排序值"
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
                valuePropName: 'checked',
                initialValue: this.currentItem.id ? this.currentItem.status === 1 : true,
                rules: [
                  {
                    required: true,
                    type: 'boolean',
                    message: '请选择状态!',
                    trigger: 'change'
                  }
                ]
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
