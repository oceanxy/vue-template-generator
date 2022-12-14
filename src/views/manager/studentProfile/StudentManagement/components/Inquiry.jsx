import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    classNumber: [],
    classList: [],
    initialValues: {
      status: '',
      gender: '',
      gradeName: '',
      isWearGlasses: '',
      originalSchoolName: '选择学校',
      classNumber: ''
    }
  }),
  computed: {
    ...mapGetters({ getState: 'getState' }),
    gradeList() {
      return this.getState('gradeList', this.moduleName)
    },
    schoolId() {
      return this.getState('search', this.moduleName)?.schoolId ?? null
    },
    schoolAllList() {
      return this.getState('schoolAllList', this.moduleName)?.list ?? []
    },
    curGrade: {
      get() {
        return this.getState('grade', this.moduleName)
      },
      set(grade) {
        this.$store.commit('setState', {
          value: grade,
          moduleName: this.moduleName,
          stateName: 'grade'
        })
      }
    },
    curClassNumber: {
      get() {
        return this.getState('classNumber', this.moduleName)
      },
      set(nunber) {
        this.$store.commit('setState', {
          value: nunber,
          moduleName: this.moduleName,
          stateName: 'classNumber'
        })
      }
    }
  },

  created() {
    this.getSchoolAllList()
  },
  methods: {
    async getSchoolAllList() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'schoolAllList',
        customApiName: 'getAllSchoolList'
      })
    },
    async getGradeList() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'gradeList',
        customApiName: 'getGradeListBySchoolId',
        payload: {
          schoolId: this.schoolId
        }
      })
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    onChange(value) {
      if (value) {
        this.classList = []
        this.form.setFieldsValue({ classNumber: '' })
        this.curGrade = this.gradeList.list.filter(item => {
          if (item.id === value) {
            return item
          }
        })

        this.classNumber = this.curGrade[0].classNum
        for (let i = 0; i < this.classNumber; i++) {
          this.classList.push(i)
        }
      }
    },
    onChangeClass(value) {
      this.curClassNumber = value
    }
  },
  watch: {
    schoolId(value) {
      if (value) {
        this.getGradeList()
        this.form.setFieldsValue({ gradeName: '' })
        this.form.setFieldsValue({ classNumber: '' })
      }
    }
  },
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <div class={'row-down'}>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status', { initialValue: this.initialValues.status })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="性别">
            {
              this.form.getFieldDecorator('gender', { initialValue: this.initialValues.gender })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>男</Select.Option>
                  <Select.Option value={2}>女</Select.Option>
                  <Select.Option value={3}>未知</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="年级">
            {
              this.form.getFieldDecorator('gradeName', { initialValue: this.initialValues.gradeName })(
                <Select onChange={this.onChange}>
                  <Select.Option value={''}>全部</Select.Option>
                  {
                    this.gradeList.list?.map(item => (
                      <Select.Option
                        value={item.id}
                      >{item.gradeName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="班级">
            {
              this.form.getFieldDecorator('classNumber', { initialValue: this.initialValues.classNumber })(
                <Select onChange={this.onChangeClass}>
                  <Select.Option value={''}>全部</Select.Option>
                  {
                    this.classList?.map(item => (
                      <Select.Option value={(item + 1)} >{(item + 1)}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="是否戴镜">
            {
              this.form.getFieldDecorator('isWearGlasses', { initialValue: this.initialValues.isWearGlasses })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>是</Select.Option>
                  <Select.Option value={0}>否</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="眼镜类型">
            {
              this.form.getFieldDecorator('glassesType', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>框架眼镜</Select.Option>
                  <Select.Option value={2}>夜戴角膜塑形镜</Select.Option>
                  <Select.Option value={3}>其他角膜接触镜</Select.Option>
                </Select>
              )
            }
          </Form.Item>

          <Form.Item label="学籍所属学校">
            {
              this.form.getFieldDecorator('originalSchoolName', { initialValue: this.initialValues.originalSchoolName })(

                <Select
                  showSearch
                  placeholder={'输入学校名称'}
                  filterOption={this.filterOption}
                  mode={'default'}
                >
                  {
                    this.schoolAllList?.map(item => (
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
          <Form.Item label={'民族'}>
            {
              this.form.getFieldDecorator('nation', { initialValue: this.initialValues.nation })(
                <Input placeholder={'请输入民族'} />
              )
            }
          </Form.Item>
          <Form.Item label={'姓名'}>
            {
              this.form.getFieldDecorator('fullName', { initialValue: this.initialValues.fullName })(
                <Input placeholder={'请输入学生姓名'} />
              )
            }
          </Form.Item>
          <Form.Item label={'身份证号'}>
            {
              this.form.getFieldDecorator('idNumber', { initialValue: this.initialValues.idNumber })(
                <Input placeholder={'请输入身份证号码'} />
              )
            }
          </Form.Item>
          <Form.Item label={'学籍号'}>
            {
              this.form.getFieldDecorator('studentNumber', { initialValue: this.initialValues.studentNumber })(
                <Input placeholder={'请输入学籍号'} />
              )
            }
          </Form.Item>
          <Form.Item label=' ' class={'form-item-btn'}>
            <Space>
              <Button
                loading={this.loading}
                htmlType="submit"
                type="primary"
                icon="search"
              >
                查询
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    )
  }
})
