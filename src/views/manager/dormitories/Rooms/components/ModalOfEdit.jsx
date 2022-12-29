import { Form, Input, InputNumber, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 860,
        destroyOnClose: true
      },
      floorTreeInModal: []
    }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    },
    schoolTree() {
      return this.$store.state[this.moduleName].schoolTree
    },
    floorTree() {
      return this.$store.state[this.moduleName].floorTree
    },
    floorTreeInModalFormStore() {
      return this.$store.state[this.moduleName].floorTreeInModal
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit()
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'schoolTree',
            customApiName: 'getSchoolTree'
          })

          if (this.search.schoolId) {
            this.floorTreeInModal = this.floorTree.list
          } else {
            this.floorTreeInModal = []
          }
        }
      }
    },
    floorTreeInModalFormStore: {
      deep: true,
      handler(value) {
        this.floorTreeInModal = value.list
      }
    }
  },
  methods: {
    async onSchoolChange(schoolId) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'floorTreeInModal',
        payload: { schoolId },
        customApiName: 'getFloorTreeBySchoolTree'
      })
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="所属学校" class={'half'}>
            {
              this.form.getFieldDecorator('schoolId', {
                initialValue: this.currentItem.schoolId || this.search.schoolId,
                rules: [
                  {
                    required: true,
                    message: '请选择学校！',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  allowClear
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.schoolTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  placeholder={'请选择学校'}
                  treeDefaultExpandedKeys={[this.currentItem.schoolId || this.search.schoolId]}
                  onChange={this.onSchoolChange}
                />
              )
            }
          </Form.Item>
          <Form.Item label="楼层" class={'half'}>
            {
              this.form.getFieldDecorator('floorId', {
                initialValue: this.currentItem.floorId,
                rules: [
                  {
                    required: true,
                    message: '请选择楼层！',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  allowClear
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.floorTreeInModal}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  placeholder={'请选择楼层'}
                  treeDefaultExpandedKeys={[this.currentItem.floorId]}
                />
              )
            }
          </Form.Item>
          <Form.Item label="房号" class={'half'}>
            {
              this.form.getFieldDecorator('roomNo', {
                initialValue: this.currentItem.roomNo,
                rules: [
                  {
                    required: true,
                    message: '请输入房号!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入房号"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label={'面积（㎡）'} class={'half'}>
            {
              this.form.getFieldDecorator('roomArea', { initialValue: this.currentItem.roomArea })(
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入房间面积"
                />
              )
            }
          </Form.Item>
          <Form.Item label={'床位数'} class={'half'}>
            {
              this.form.getFieldDecorator('bedNum', { initialValue: this.currentItem.longitude })(
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入床位数"
                />
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
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入排序值"
                />
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
                    required: true,
                    type: 'boolean',
                    message: '请选择状态!',
                    trigger: 'change'
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
