import '../assets/styles/index.scss'
import { Form, Spin, Table } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import apis from '@/apis'

export default Form.create({})({
  mixins: [forModal()],
  data() {
    return {
      visibilityFieldName: 'LevelModalOfTable',
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-edit-user-form',
        footer: false
      },
      infoList: [],
      columns: [
        {
          title: '参数名称',
          align: 'center',
          scopedSlots: { customRender: 'parameterName' }
        },
        {
          title: '性别',
          align: 'center',
          scopedSlots: { customRender: 'gender' }
        },
        {
          title: '年龄判断条件',
          align: 'center',
          scopedSlots: { customRender: 'ageJudgmentConditions' }
        },
        {
          title: '参数判断条件',
          align: 'center',
          scopedSlots: { customRender: 'paramsJudgmentConditions' }
        }
      ],
      detailsStatus: false
    }
  },
  computed: { ...mapGetters({ getState: 'getState' }) },
  methods: {},
  watch: {
    visible: {
      async handler(value) {
        if (value) {
          if (this.currentItem && this.currentItem.itemId) {

            this.detailsStatus = true
            const res = await apis.getDetailsOfConclusionLevel({ id: this.currentItem.id })

            if (res['status']) {
              this.detailsStatus = false
              this.infoList = res.data.infoList
            }
          }
        } else {
          this.infoList = []
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
        >
          <Spin spinning={this.detailsStatus}>
            <Table
              dataSource={this.infoList}
              columns={this.columns}
              rowKey={'id'}
              bordered
              {...{
                scopedSlots: {
                  parameterName: (text, record) => {
                    return (
                      <div>{record.paramName}</div>
                    )
                  },
                  gender: (text, record) => {
                    return (
                      <div>{record.genderStr}</div>
                    )
                  },
                  ageJudgmentConditions: (text, record) => {
                    return (
                      <div>
                        {record.ageLeftValue}&nbsp;
                        {record.ageLeftSymbol === 1 ? '≦' : '<'}&nbsp;
                        年龄&nbsp;
                        {record.ageRightSymbol === 1 ? '≦' : '<'}&nbsp;
                        {record.ageRightValue}
                      </div>
                    )
                  },
                  paramsJudgmentConditions: (text, record) => (
                    <div>
                      {record.conditionLeftValue}&nbsp;
                      {record.conditionLeftSymbol === 1 ? '≦' : '<'}&nbsp;
                      参数&nbsp;
                      {record.conditionRightSymbol === 1 ? '≦' : '<'}&nbsp;
                      {record.conditionRightValue}
                    </div>
                  )
                }
              }}
            />
          </Spin>
        </Form>
      </DragModal>
    )
  }
})
