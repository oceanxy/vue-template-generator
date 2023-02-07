import { Checkbox, Form, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'
import PendingStudents from '@/views/manager/reportMedicalExamination/ReportOverview/components/PendingStudents'

export default Form.create({})({
  mixins: [forFormModal({ disableSubmitButton: false })],
  data() {
    return {
      visibilityFieldName: 'visibilityOfOneClickReport',
      modalProps: {
        width: 740,
        destroyOnClose: true
      }
    }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    },
    pendingStudents() {
      return this.$store.state[this.moduleName].pendingStudents
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel('visibilityOfOneClickReport'),
          ok: () => this.onSubmit({
            customApiName: 'onClickReport',
            customDataHandler: value => {
              const data = cloneDeep(value)

              data.id = this.currentItem.id
              data.isStop = +data.isStop

              return data
            }
          })
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'pendingStudents',
            customApiName: 'getPendingStudents',
            payload: { id: this.currentItem.id }
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Spin spinning={this.pendingStudents.loading}>
          <Form class="tg-form-grid" colon={false}>
            {
              this.pendingStudents.list.length
                ? (
                  <Form.Item>
                    {
                      this.form.getFieldDecorator('studentIds', { initialValue: [] })(
                        <PendingStudents dataSource={this.pendingStudents.list} />
                      )
                    }
                  </Form.Item>
                )
                : (
                  <p style={'font-size: 14px; font-weight: bolder; padding-bottom: 20px;'}>
                    {
                      !this.pendingStudents.loading
                        ? '未发现待处理的异常学生，可进行一键上报，上报后亦可添加异常。'
                        : '暂无数据'
                    }
                  </p>
                )
            }
            <Form.Item>
              {
                this.form.getFieldDecorator('isStop', {
                  initialValue: false,
                  valuePropName: 'checked',
                  getValueProp: val => ({ checked: isNaN(val) ? val : !!val })
                })(
                  <Checkbox>班级停课</Checkbox>
                )
              }
            </Form.Item>
          </Form>
        </Spin>
      </DragModal>
    )
  }
})
