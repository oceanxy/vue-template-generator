import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      curSchool: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    yearList() {
      return this.getState('yearList', this.moduleName)
    },
    schoolListByThisUser() {
      return this.getState('schoolListByThisUser', this.moduleName)
    },
    schoolName() {
      if (this.currentItem.schoolName) {
        return true
      } else {
        return false
      }
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
        }
      }
    }
  },
  methods: {
    async getStreetList() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'schoolListByThisUser',
        customApiName: 'getSchoolListByThisUser'
      })
    },
    onChange(value) {
      this.curSchool = value
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    customDataHandler(values) {
      const data = { ...values }

      data.schoolId = this.currentItem?.schoolId ?? this.curSchool.key
      data.schoolName = this.currentItem?.schoolName ?? this.curSchool.label

      return data
    }
  },
  watch: {

    'modalProps.visible'(value) {
      if (value) {
        this.getStreetList()
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 17 }}
          colon={false}
        >
          <Form.Item label="学校名称">
            {
              this.form.getFieldDecorator('schoolId', {
                initialValue: this.currentItem.schoolId
                  ? { key: this.currentItem.schoolId, label: this.currentItem.schoolName }
                  : undefined
              })(
                <Select
                  allowClear
                  showSearch
                  filterOption={this.filterOption}
                  placeholder={'输入学校名称'}
                  // filterOption={false}
                  labelInValue
                  disabled={this.schoolName}
                  mode={'default'}
                  onChange={this.onChange}
                >
                  {
                    this.schoolListByThisUser.list.map(item => (
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
          <Form.Item label="年级名称">
            {
              this.form.getFieldDecorator('gradeName', {
                initialValue: this.currentItem.gradeName,
                rules: [
                  {
                    required: true,
                    message: '请输入年级名称!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="入学年份">
            {
              this.form.getFieldDecorator(
                'gradeYear',
                {
                  initialValue: this.currentItem.gradeYear,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择入学年份!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select placeholder="请选择年份">
                  {
                    this.yearList.years?.map(item => (
                      <Select.Option value={item}>{item}</Select.Option>
                    ))
                  }

                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="届数">
            {
              this.form.getFieldDecorator(
                'gradeTh',
                {
                  initialValue: this.currentItem.gradeTh,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择届数!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select placeholder="请选择届数">
                  {
                    this.yearList.yearsTh?.map(item => (
                      <Select.Option value={item}>{item}</Select.Option>
                    ))
                  }

                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="年级类型">
            {
              this.form.getFieldDecorator(
                'gradeType',
                {
                  initialValue: this.currentItem.gradeType,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择年级类型!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select placeholder="请选择年级类型">
                  <Select.Option value={0}>幼儿园</Select.Option>
                  <Select.Option value={3}>小学</Select.Option>
                  <Select.Option value={9}>初中</Select.Option>
                  <Select.Option value={12}>高中</Select.Option>
                  <Select.Option value={15}>大学</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="班级数量">
            {
              this.form.getFieldDecorator('classNum', {
                initialValue: this.currentItem.classNum,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入班级数量!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="请输入"
                />
              )
            }
          </Form.Item>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status', {
                initialValue: this.currentItem.status === undefined ? true : this.currentItem.status === 1,
                valuePropName: 'checked'
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
