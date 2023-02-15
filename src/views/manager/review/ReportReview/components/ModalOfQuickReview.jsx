import { Alert, Form, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import PendingStudents from '@/views/manager/reportMedicalExamination/ReportOverview/components/PendingStudents'

export default Form.create({})({
  mixins: [forFormModal({ disableSubmitButton: false })],
  data() {
    return {
      visibilityFieldName: 'visibilityOfQuickReview',
      modalProps: {
        width: 740,
        destroyOnClose: true
      }
    }
  },
  computed: {
    studentsNeedToQuickReview() {
      return this.$store.state[this.moduleName].studentsNeedToQuickReview
    },
    count() {
      return this.studentsNeedToQuickReview.pendingGradeList.reduce((total, cur) => {
        total += cur.pendingStudentVOList.length

        return total
      }, 0)
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit({
            customApiName: 'rapidReviewBySchoolDoctor',
            customDataHandler: value => ({
              abnormalIds: Object.values(value).reduce((ids, cur) => {
                ids = ids.concat(cur)

                return ids
              }, [])
            })
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Spin spinning={this.studentsNeedToQuickReview.loading}>
          <Alert
            message={
              `${
                this.studentsNeedToQuickReview.reportTimeStr
              } ${
                this.studentsNeedToQuickReview.reportTimePeriodStr
              } 您有${
                this.studentsNeedToQuickReview.pendingGradeList.length
              }条数据可执行一键审核操作`
            }
            type={'info'}
            style={'margin-bottom: 20px'}
          />
          <Form colon={false}>
            {
              this.studentsNeedToQuickReview.pendingGradeList.map((item, index) => (
                <Form.Item label={item.gradeClass}>
                  {
                    this.form.getFieldDecorator(`studentIds-${index}`, { initialValue: [] })(
                      <PendingStudents
                        showButton={false}
                        dataSource={item.pendingStudentVOList}
                      />
                    )
                  }
                </Form.Item>
              ))
            }
          </Form>
        </Spin>
      </DragModal>
    )
  }
})
