import './assets/styles/index.scss'
import { Select, Spin } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import TableForItem from './components/TableForItem'
import TableForType from './components/TableForType'
import { dispatch } from '@/utils/store'
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionnaireStatistics',
  mixins: [dynamicState(store, dynamicModules)],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    questionnairesForSelect() {
      return this.getState('questionnairesForSelect', 'common')
    },
    loadingOfQuestionnairesForSelect() {
      return this.getState('loadingOfQuestionnairesForSelect', 'common')
    },
    templateId: {
      get() {
        return this.getState('templateId', this.moduleName)
      },
      async set(value) {
        await this.$store.dispatch(`${this.moduleName}/setTemplateId`, value)
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
      if (value.length) {
        await this.$store.dispatch(`${this.moduleName}/setTemplateId`, value[0].templateId)
      }
    }
  },
  async created() {
    await dispatch('common', 'getQuestionnairesForSelect')
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
            vModel={this.templateId}
            placeholder={'请选择问卷'}
            class={'list-select'}
            notFoundContent={this.loadingOfQuestionnairesForSelect ? <Spin /> : undefined}
          >
            {
              this.questionnairesForSelect.map(item => (
                <Select.Option value={item.templateId}>{item.fullName}</Select.Option>
              ))
            }
          </Select>
          <div class={'list'}>
            <Spin spinning={this.itemLoading} style={{ width: '100%' }}>
              {
                this.itemOfQuestionnaireTemplate.map((item, index) => (
                  <div
                    class={`list-item${this.itemId === item.id ? ' checked' : ''}`}
                    onClick={() => this.setItemId(item.id)}
                  >
                    <span>{index + 1}</span>
                    <span>{item.fullName}</span>
                  </div>
                ))
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
