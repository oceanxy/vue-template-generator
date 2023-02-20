import DragModal from '@/components/DragModal'
import { Button, Descriptions, Timeline } from 'ant-design-vue'
import ModalOfPotentiallyInfectedStudents from '../../ReportReview/components/ModalOfPotentiallyInfectedStudents'
import forModal from '@/mixins/forModal'
import TimelineItem from 'ant-design-vue/lib/timeline/TimelineItem'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 910,
        destroyOnClose: true
      },
      visibilityFieldName: 'visibilityOfEdit'
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => {
            //
          }
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getDetails', {
            moduleName: this.moduleName,
            payload: { id: this.currentItem.id }
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Descriptions
          layout={'vertical'}
          bordered
          column={5}
          size={'small'}
        >
          <Descriptions.Item label={'姓名'}>{this.details.studentName}</Descriptions.Item>
          <Descriptions.Item label={'性别'}>{this.details.genderStr}</Descriptions.Item>
          <Descriptions.Item label={'年龄'}>{this.details.age}</Descriptions.Item>
          <Descriptions.Item label={'学校'}>{this.details.schoolName}</Descriptions.Item>
          <Descriptions.Item label={'班级'}>{this.details.gradeClassStr}</Descriptions.Item>
        </Descriptions>
        <Timeline style={'margin-top: 2ic'}>
          {
            this.details.infoList?.map(item => (
              <TimelineItem>
                <Descriptions
                  title={item.createTimeDay}
                  layout={'vertical'}
                  column={4}
                  bordered
                  size={'small'}
                >
                  <Descriptions.Item label={'症状'}>{item.symptomName}</Descriptions.Item>
                  <Descriptions.Item label={'诊断'}>{item.diagnoseName}</Descriptions.Item>
                  <Descriptions.Item
                    label={'宿舍'}
                    span={2}
                  >
                    <span>{item.buildName}{item.roomNo}</span>
                    <Button
                      size={'small'}
                      type={'danger'}
                      style={`margin-left: 1ic; visibility: ${item.roomId ? 'visible' : 'hidden'}`}
                      onClick={() => this._setVisibilityOfModal(undefined, 'visibilityOfPotentiallyInfectedStudents')}
                    >
                      摸排病例
                    </Button>
                  </Descriptions.Item>
                  {
                    item.description
                      ? (
                        <Descriptions.Item
                          span={4}
                          label={'描述'}
                        >
                          {item.description}
                        </Descriptions.Item>
                      )
                      : null
                  }
                </Descriptions>
              </TimelineItem>
            ))
          }
        </Timeline>
        <ModalOfPotentiallyInfectedStudents modalTitle={'摸排对象'} />
      </DragModal>
    )
  }
}
