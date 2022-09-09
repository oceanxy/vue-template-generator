import '../assets/styles/index.scss'
import { DatePicker, Form, Input, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import moment from 'moment'
import { debounce } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data () {
    return { modalProps: { width: 810 } }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    enterpriseClassifications () {
      return this.getState('enterpriseClassifications', 'common')
    }
    // parkTeamsForSelect () {
    //   return this.getState('parkTeamsForSelect', this.moduleName)
    // },
    // membersOfParkTeamForSelect () {
    //   return this.getState('membersOfParkTeamForSelect', this.moduleName)
    // },
    // teamId () {
    //   return this.form.getFieldValue('teamId')
    // }
  },
  watch: {
    visible: {
      immediate: true,
      async handler (value) {
        if (value) {
          await dispatch('common', 'getEnterpriseClassifications')
          // await this.getParkTeams()
        }
      }
    }
    // async teamId (value) {
    //   if (value) {
    //     await this.getMembersOfParkTeam()
    //   }
    // }
  },
  methods: {
    customDataHandler (values) {
      values.gatherTime = values.gatherTime ? values.gatherTime.format('YYYYMMDDHHmmss') : ''

      return values
    },
    /**
     * 获取园区团队数据
     * @param [value] {string}
     * @returns {Promise<void>}
     */
    // async getParkTeams (value) {
    //   await this.$store.dispatch('getListForSelect', {
    //     moduleName: this.moduleName,
    //     customApiName: 'getParkTeams',
    //     stateName: 'parkTeamsForSelect',
    //     payload: { teamName: value }
    //   })
    // },
    /**
     * 获取园区团队成员数据
     * @param [value] {string}
     * @returns {Promise<void>}
     */
    // async getMembersOfParkTeam (value) {
    //   await this.$store.dispatch('getListForSelect', {
    //     moduleName: this.moduleName,
    //     customApiName: 'getMembersOfParkTeam',
    //     stateName: 'membersOfParkTeamForSelect',
    //     payload: {
    //       id: this.form.getFieldValue('teamId'),
    //       memberName: value
    //     }
    //   })
    // }
  },
  render () {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form class="bnm-form-grid" colon={false}>
          <Form.Item label="线索标题">
            {
              this.form.getFieldDecorator('title', {
                initialValue: this.currentItem.title,
                rules: [{
                  required: true, message: '请输入线索标题', trigger: 'blur'
                }]
              })(
                <Input placeholder="请输入" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="线索来源" class={'half'}>
            {
              this.form.getFieldDecorator('cluesResource', { initialValue: this.currentItem.cluesResource })(
                <Input placeholder="请输入" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="所属行业" class={'half'}>
            {
              this.form.getFieldDecorator('industry', { initialValue: this.currentItem.industry || undefined })(
                <Select
                  placeholder="请选择所属行业"
                  allowClear
                  notFoundContent={this.enterpriseClassifications.loading ? <Spin /> : undefined}
                >
                  {
                    this.enterpriseClassifications.list.map(item => (
                      <Select.Option value={item.id}>{item.fullName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="采集人" class={'half'}>
            {
              this.form.getFieldDecorator('gatherName', { initialValue: this.currentItem.gatherName })(
                <Input placeholder={'请输入采集人姓名'} allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="采集时间" class={'half'}>
            {
              this.form.getFieldDecorator('gatherTime', {
                initialValue: this.currentItem.gatherTime
                  ? moment(this.currentItem.gatherTimeStr)
                  : ''
              })(
                <DatePicker
                  showTime
                  placeholder={'请选择采集事件'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="线索描述">
            {
              this.form.getFieldDecorator('cluesDescription', {
                initialValue: this.currentItem.cluesDescription,
                rules: [{
                  required: true, message: '请输入线索描述', trigger: 'blur'
                }]
              })(
                <Input.TextArea placeholder={'请输入线索描述'} autoSize={{ minRows: 6 }} />
              )
            }
          </Form.Item>
          {/*<Form.Item label="跟进团队" class={'half'}>*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('teamId', { initialValue: this.currentItem.teamId })(*/}
          {/*      <Select*/}
          {/*        placeholder={'输入团队名称搜索'}*/}
          {/*        showSearch*/}
          {/*        allowClear*/}
          {/*        filterOption={false}*/}
          {/*        onSearch={debounce(this.getParkTeams, 300)}*/}
          {/*        notFoundContent={this.parkTeamsForSelect.loading ? <Spin /> : undefined}*/}
          {/*      >*/}
          {/*        {*/}
          {/*          this.parkTeamsForSelect.list.map(item => (*/}
          {/*            <Select.Option value={item.id} title={item.fullName}>*/}
          {/*              {item.fullName}*/}
          {/*            </Select.Option>*/}
          {/*          ))*/}
          {/*        }*/}
          {/*      </Select>*/}
          {/*    )*/}
          {/*  }*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="跟进成员" class={'half'}>*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('memberId', { initialValue: this.currentItem.memberId })(*/}
          {/*      <Select*/}
          {/*        disabled={!this.teamId}*/}
          {/*        placeholder={'输入团队成员名称搜索'}*/}
          {/*        showSearch*/}
          {/*        allowClear*/}
          {/*        filterOption={false}*/}
          {/*        onSearch={debounce(this.getMembersOfParkTeam, 300)}*/}
          {/*        notFoundContent={this.membersOfParkTeamForSelect.loading ? <Spin /> : undefined}*/}
          {/*      >*/}
          {/*        {*/}
          {/*          this.membersOfParkTeamForSelect.list.map(item => (*/}
          {/*            <Select.Option value={item.id} title={item.fullName}>*/}
          {/*              {item.fullName}*/}
          {/*            </Select.Option>*/}
          {/*          ))*/}
          {/*        }*/}
          {/*      </Select>*/}
          {/*    )*/}
          {/*  }*/}
          {/*</Form.Item>*/}
        </Form>
      </DragModal>
    )
  }
})
