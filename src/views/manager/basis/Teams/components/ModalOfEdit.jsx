import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import MultiInput from '@/views/manager/basis/Teams/components/MultiInput'
import BNUploadPictures from '@/components/BNUploadPictures'
import { mapGetters } from 'vuex'
// import { mapGetters } from 'vuex'
// import { dispatch } from '@/utils/store'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 900 } }
  },
  // computed: {
  //   ...mapGetters({ getState: 'getState' }),
  //   parksForSelect() {
  //     return this.getState('parksForSelect', 'common') || []
  //   }
  // },
  // watch: {
  //   visible: {
  //     immediate: true,
  //     async handler(value) {
  //       if (value) {
  //         await dispatch('common', 'getParksForSelect')
  //       }
  //     }
  //   }
  // },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customValidation: () => {
            let validationResult = true

            // 新增时要做团队成员的验证，编辑时该字段为只读，不做验证
            if (!this.currentItem.id) {
              const teamMemberList = this.form.getFieldValue('teamMemberList')
              const hasPersonInCharge = teamMemberList.filter(item => item.fullName && item.mobile && item.idCard)

              if (!teamMemberList.length) {
                validationResult = false
              }

              if (!hasPersonInCharge.find(item => item.isLeader === 1)) {
                this.form.setFields({
                  teamMemberList: {
                    value: teamMemberList,
                    errors: [new Error('您填写的团队成员信息不合法，请设置一个负责人！')]
                  }
                })

                validationResult = false
              }
            }

            return validationResult
          }
        })
      }
    }

    // 回显图片
    const fileList = []

    if (this.currentItem.logo) {
      fileList.push({
        uid: 'logo',
        url: this.currentItem.logoStr,
        key: this.currentItem.logo,
        status: 'done',
        name: this.currentItem.logo?.substring(this.currentItem.logo?.lastIndexOf('/'))
      })
    }

    return (
      <DragModal {...attributes} class={'bnm-team-edit-modal'}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="LOGO">
            {
              this.form.getFieldDecorator('logo', { initialValue: fileList })(
                <BNUploadPictures limit={1} />
              )
            }
          </Form.Item>
          <Form.Item label="名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true, message: '请输入团队名称!', trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="编号" class={'half'}>
            {
              this.form.getFieldDecorator('teamNo', { initialValue: this.currentItem.teamNo })(
                <Input placeholder="请输入编号" allowClear />
              )
            }
          </Form.Item>
          {/*<Form.Item label={'所属中心'} class={'half'}>*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('parkId', {*/}
          {/*      initialValue: this.currentItem.parkId || undefined,*/}
          {/*      rules: [*/}
          {/*        {*/}
          {/*          required: true, message: '请选择所属中心!', trigger: 'change'*/}
          {/*        }*/}
          {/*      ]*/}
          {/*    })(*/}
          {/*      <Select placeholder={'请选择所属中心'}>*/}
          {/*        {*/}
          {/*          this.parksForSelect.map(item => (*/}
          {/*            <Select.Option value={item.id}>{item.fullName}</Select.Option>*/}
          {/*          ))*/}
          {/*        }*/}
          {/*      </Select>*/}
          {/*    )*/}
          {/*  }*/}
          {/*</Form.Item>*/}
          <Form.Item label="团队成员">
            {
              // 编辑时，不在 this.form 内注册该字段，仅只读
              this.currentItem.id
                ? <MultiInput vModel={this.currentItem.teamMemberList} disabled />
                : this.form.getFieldDecorator('teamMemberList', {
                  initialValue: this.currentItem.teamMemberList || [],
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请添加团队成员!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <MultiInput />
                )
            }
          </Form.Item>
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea placeholder="请输入描述" autoSize={{ minRows: 6 }} allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序值!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber style={{ width: '100%' }} placeholder="请输入排序值" />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: this.currentItem.id ? this.currentItem.status === 1 : true,
                rules: [
                  {
                    required: true, type: 'boolean', message: '请选择状态!', trigger: 'blur'
                  }
                ]
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
