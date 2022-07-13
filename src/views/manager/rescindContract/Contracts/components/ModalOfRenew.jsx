import '../index.scss'
import { Form, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { debounce } from 'lodash'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    modalTitle: {
      type: String,
      default: '{action}'
    }
  },
  data() {
    return {
      modalProps: {
        width: 400,
        okText: '确定'
      },
      visibleField: 'visibleOfRenew'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' })
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          // await this.getParkTeams()
        }
      }
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
          {/*<Form.Item label="跟进团队">*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('teamId', {*/}
          {/*      rules: [{ required: true, message: '请选择跟进团队!', trigger: 'change' }]*/}
          {/*    })(*/}
          {/*      <Select*/}
          {/*        placeholder={'输入团队名称搜索'}*/}
          {/*        showSearch*/}
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
          {/*<Form.Item label="跟进人">*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('memberId', {*/}
          {/*      rules: [{ required: true, message: '请选择跟进人!', trigger: 'change' }]*/}
          {/*    })(*/}
          {/*      <Select*/}
          {/*        disabled={!this.teamId}*/}
          {/*        placeholder={'输入团队成员名称搜索'}*/}
          {/*        showSearch*/}
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
