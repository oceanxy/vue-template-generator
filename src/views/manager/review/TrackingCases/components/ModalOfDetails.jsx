import DragModal from '@/components/DragModal'
import { Button, Descriptions, Spin, Timeline } from 'ant-design-vue'
import ModalOfPotentiallyInfectedStudents from '../../ReportReview/components/ModalOfPotentiallyInfectedStudents'
import forModal from '@/mixins/forModal'
import TimelineItem from 'ant-design-vue/lib/timeline/TimelineItem'
import ModalOfAddTrace from '@/views/manager/review/TrackingCases/components/ModalOfAddTrace'

export default {
  mixins: [forModal()],
  data() {
    return {
      visibilityFieldName: 'visibilityOfEdit',
      modalProps: {
        width: 910,
        destroyOnClose: true,
        cancelText: '结束跟进',
        okText: '添加记录',
        footer: [
          <Button onClick={() => this.onCancel()}>关闭</Button>,
          <Button type={'primary'} onClick={() => this.stopFollowingUp()}>结束跟进</Button>,
          <Button type={'primary'} onClick={() => this.addRecord()}>添加记录</Button>
        ]
      }
    }
  },
  computed: {
    loadingDetails() {
      return this.$store.state[this.moduleName].loadingDetails
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: { cancel: () => this.onCancel() }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.getDetails()
        }
      }
    }
  },
  methods: {
    async getDetails() {
      await this.$store.dispatch('getDetails', {
        moduleName: this.moduleName,
        payload: { id: this.currentItem.id }
      })
    },
    async stopFollowingUp() {
      await this.$store.dispatch('update', {
        moduleName: this.moduleName,
        payload: { id: this.currentItem.id },
        visibilityFieldName: this.visibilityFieldName,
        customApiName: 'stopFollowingUp',
        isFetchList: true
      })
    },
    async addRecord() {
      await this._setVisibilityOfModal(undefined, 'visibilityOfAddTrace')
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Spin spinning={this.loadingDetails} delay={300}>
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
                    title={item.createTimeDayStr}
                    layout={'vertical'}
                    column={4}
                    bordered
                    size={'small'}
                  >
                    <Descriptions.Item span={1} label={'症状'}>{item.symptomName}</Descriptions.Item>
                    <Descriptions.Item span={1} label={'诊断'}>{item.diagnoseName}</Descriptions.Item>
                    <Descriptions.Item span={2} label={'宿舍'}>
                      <span>{item.buildName}{item.roomNo}</span>
                      <Button
                        size={'small'}
                        type={'danger'}
                        style={`margin-left: 1ic; visibility: ${item.roomId ? 'visible' : 'hidden'}`}
                        onClick={() => this._setVisibilityOfModal(
                          { _floorId: item.floorId, _roomId: item.roomId },
                          'visibilityOfPotentiallyInfectedStudents',
                          undefined, undefined, true
                        )}
                      >
                        摸排病例
                      </Button>
                    </Descriptions.Item>
                    {
                      item.description
                        ? <Descriptions.Item span={4} label={'描述'}>{item.description}</Descriptions.Item>
                        : null
                    }
                  </Descriptions>
                </TimelineItem>
              ))
            }
          </Timeline>
        </Spin>
        <ModalOfPotentiallyInfectedStudents modalTitle={'摸排对象'} />
        <ModalOfAddTrace modalTitle={'添加追踪记录'} onAdd={this.getDetails} />
      </DragModal>
    )
  }
}
