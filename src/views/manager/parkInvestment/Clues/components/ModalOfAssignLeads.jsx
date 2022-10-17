import '../assets/styles/index.scss'
import { Form, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { debounce } from 'lodash'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 400,
        okText: '确定'
      },
      visibleField: 'visibleOfAssignLeads'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    parkTeamsForSelect() {
      return this.getState('parkTeamsForSelect', this.moduleName)
    },
    membersOfParkTeamForSelect() {
      return this.getState('membersOfParkTeamForSelect', this.moduleName)
    },
    teamId() {
      return this.form.getFieldValue('teamId')
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.getParkTeams()
        }
      }
    },
    async teamId(value) {
      this.form.setFieldsValue({ 'memberId': undefined })

      if (value) {
        await this.getMembersOfParkTeam()
      }
    }
  },
  methods: {
    /**
     * 获取园区团队数据
     * @param [value] {string}
     * @returns {Promise<void>}
     */
    async getParkTeams(value) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        customApiName: 'getParkTeams',
        stateName: 'parkTeamsForSelect',
        payload: { teamName: value }
      })
    },
    /**
     * 获取园区团队成员数据
     * @param [value] {string}
     * @returns {Promise<void>}
     */
    async getMembersOfParkTeam(value) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        customApiName: 'getMembersOfParkTeam',
        stateName: 'membersOfParkTeamForSelect',
        payload: {
          id: this.form.getFieldValue('teamId'),
          memberName: value
        }
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({ customApiName: 'allotClues' })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid bnm-form-assign-leads"
          colon={false}
        >
          <Form.Item label="跟进团队">
            {
              this.form.getFieldDecorator('teamId', {
                rules: [
                  {
                    required: true,
                    message: '请选择跟进团队!',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder={'输入团队名称搜索'}
                  showSearch
                  filterOption={false}
                  onSearch={debounce(this.getParkTeams, 300)}
                  notFoundContent={this.parkTeamsForSelect.loading ? <Spin /> : undefined}
                >
                  {
                    this.parkTeamsForSelect.list.map(item => (
                      <Select.Option
                        value={item.id}
                        title={item.fullName}
                      >
                        {item.fullName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="跟进人">
            {
              this.form.getFieldDecorator('memberId', {
                rules: [
                  {
                    required: true,
                    message: '请选择跟进人!',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  disabled={!this.teamId}
                  placeholder={'输入团队成员名称搜索'}
                  showSearch
                  filterOption={false}
                  onSearch={debounce(this.getMembersOfParkTeam, 300)}
                  notFoundContent={this.membersOfParkTeamForSelect.loading ? <Spin /> : undefined}
                >
                  {
                    this.membersOfParkTeamForSelect.list.map(item => (
                      <Select.Option
                        value={item.id}
                        title={item.fullName}
                      >
                        {item.fullName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
