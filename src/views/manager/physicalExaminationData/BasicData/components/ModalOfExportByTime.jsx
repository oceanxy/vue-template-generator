import '../assets/styles/index.scss'
import { DatePicker, Form, Select } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 600,
        destroyOnClose: true,
        okText: '导出'
      },
      visibilityFieldName: 'visibilityOfExportByTime'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    activities() {
      return this.getState('activities', this.moduleName)
    },
    search() {
      return this.getState('search', this.moduleName)
    },
    fileName() {
      return `体检基础数据（${this.form.getFieldValue('dateRange').join('至')}）`
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel('visibilityOfExportByTime'),
          ok: () => this.onSubmit({
            isFetchList: false,
            customApiName: 'exportBasicDataByTime',
            customAction: 'export'
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          class="tg-form-grid"
          colon={false}
        >
          <Form.Item label="活动">
            {
              this.form.getFieldDecorator('activityId', {
                initialValue: this.search.activityId,
                rules: [
                  {
                    required: true,
                    message: '请选择活动名称',
                    trigger: 'blur'
                  }
                ]
              })(
                <Select placeholder="请选择活动名称" allowClear>
                  {
                    this.activities.list.map(item => (
                      <Select.Option value={item.id} title={item.activityName}>
                        {item.activityName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="体检时间">
            {
              this.form.getFieldDecorator('dateRange', { initialValue: [] })(
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  placeholder={['开始时间', '结束时间']}
                  valueFormat={'YYYY-MM-DD'}
                  allowClear
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
