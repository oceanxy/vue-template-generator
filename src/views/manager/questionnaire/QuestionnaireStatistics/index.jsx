import './assets/styles/index.scss'
import { Empty, Select, Spin } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import TableForItem from './components/TableForItem'
import TableForType from './components/TableForType'
import { dispatch } from '@/utils/store'
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionnaireStatistics',
  mixins: [dynamicState()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    questionnairesForSelect() {
      return this.getState('questionnairesForSelect', 'common')
    },
    loadingOfQuestionnairesForSelect() {
      return this.getState('loadingOfQuestionnairesForSelect', 'common')
    },
    questionnaireId: {
      get() {
        return this.getState('questionnaireId', this.moduleName)
      },
      async set(value) {
        await this.$store.dispatch(`${this.moduleName}/setQuestionnaireId`, value)
      }
    },
    itemId() {
      return this.getState('itemId', this.moduleName)
    },
    itemOfQuestionnaireTemplate() {
      return this.getState('itemOfQuestionnaireTemplate', this.moduleName)
    },
    itemLoading() {
      return this.getState('itemLoading', this.moduleName)
    }
  },
  watch: {
    async questionnairesForSelect(value) {
      if (value.length && !this.$route.query?.id) {
        this.questionnaireId = value[0].id
      }
    }
  },
  async created() {
    await dispatch('common', 'getQuestionnairesForSelect')

    if (this.$route.query?.id) {
      this.questionnaireId = this.$route.query.id
    }
  },
  methods: {
    setItemId(value) {
      this.$store.commit(`${this.moduleName}/setItemId`, value)
    }
  },
  render() {
    return (
      <TGContainerWithSider
        siderOnLeft
        class={'bnm-questionnaire-statistics-container'}
      >
        <template slot={'sider'}>
          <Select
            vModel={this.questionnaireId}
            placeholder={'请选择问卷'}
            class={'list-select'}
            notFoundContent={this.loadingOfQuestionnairesForSelect ? <Spin /> : undefined}
          >
            {
              this.questionnairesForSelect.map(item => (
                <Select.Option value={item.id}>{item.fullName}</Select.Option>
              ))
            }
          </Select>
          <div class={'list'}>
            <Spin spinning={this.itemLoading} style={{ width: '100%' }}>
              {
                this.itemOfQuestionnaireTemplate.length
                  ? this.itemOfQuestionnaireTemplate.map((item, index) => (
                    <div
                      class={`list-item${this.itemId === item.id ? ' checked' : ''}`}
                      onClick={() => this.setItemId(item.id)}
                    >
                      <span>{index + 1}</span>
                      <span>{item.fullName}</span>
                    </div>
                  ))
                  : <Empty />
              }
            </Spin>
          </div>
        </template>
        <template slot={'default'}>
          <TableForItem />
          <TableForType />
        </template>
      </TGContainerWithSider>
    )
  }
}
