import './index.scss'
import { DatePicker, Empty, Form, Input, Radio, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep, debounce } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true
      }
    }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    },
    students() {
      return this.$store.state[this.moduleName].students
    },
    symptoms() {
      return this.$store.state[this.moduleName].symptoms
    },
    diagnoses() {
      return this.$store.state[this.moduleName].diagnoses
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({
            customDataHandler: value => {
              const { id, ...rest } = cloneDeep(value)

              return {
                id,
                checkAbnormalAddRO: rest
              }
            }
          })
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          // 初始化表单内的模糊查询结果
          this.clear('students')
        }
      }
    }
  },
  methods: {
    clear(fieldName) {
      this.$store.commit('setState', {
        value: { loading: false, list: [] },
        moduleName: this.moduleName,
        stateName: fieldName
      })
    },
    async onSearchForStudent(studentName) {
      // 搜索前，先清空上一次搜索结果缓存
      this.clear('students')

      if (studentName) {
        await this.$store.dispatch('getListWithLoadingStatus', {
          moduleName: this.moduleName,
          stateName: 'students',
          customApiName: 'getStudentsByName',
          payload: {
            classNumber: this.currentItem.classNumber,
            gradeId: this.currentItem.gradeId,
            name: studentName
          }
        })
      }
    },
    async onSearchForSymptom(symptomName) {
      // 搜索前，先清空上一次搜索结果缓存
      // this.clear('symptoms')

      if (symptomName) {
        await this.$store.dispatch('getListWithLoadingStatus', {
          moduleName: this.moduleName,
          stateName: 'symptoms',
          customApiName: 'getSymptomsByName',
          payload: { name: symptomName }
        })
      }
    },
    async onSearchForDiagnosis(diagnosisName) {
      // 搜索前，先清空上一次搜索结果缓存
      // this.clear('diagnoses')

      if (diagnosisName) {
        await this.$store.dispatch('getListWithLoadingStatus', {
          moduleName: this.moduleName,
          stateName: 'diagnoses',
          customApiName: 'getDiagnosesByName',
          payload: { name: diagnosisName }
        })
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="班级" class={'half'} required>
            <Input
              placeholder="请选择班级"
              disabled
              vModel={this.currentItem.gradeClassStr}
            />
          </Form.Item>
          <Form.Item label="上报时段" class={'half'} required>
            <Select
              placeholder="请选择上报时段"
              disabled
              vModel={this.currentItem.reportTimePeriod}
            >
              <Select.Option value={1}>晨检</Select.Option>
              <Select.Option value={2}>午检</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="学生姓名" class={'half'}>
            {
              this.form.getFieldDecorator('studentId', {
                initialValue: this.currentItem.studentId,
                rules: [
                  {
                    required: true,
                    message: '请选择学生！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder="请输入学生姓名搜索"
                  showSearch
                  onSearch={debounce(this.onSearchForStudent, 300)}
                  filterOption={false}
                  notFoundContent={this.students.loading ? <Spin /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                >
                  {
                    this.students.list.map(student => (
                      <Select.Option value={student.id}>
                        <div class={'report-overview-student'}>
                          <span>{student.fullName}</span>
                          <span class={'sub'}>{student.gradeName}{student.classNumber}班</span>
                        </div>
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="登记类型" class={'half'}>
            {
              this.form.getFieldDecorator('registerType', {
                initialValue: this.currentItem.registerType || 1,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择登记类型！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select placeholder="请选择登记类型" allowClear>
                  <Select.Option value={1}>带病上课</Select.Option>
                  <Select.Option value={2}>因病缺课</Select.Option>
                  <Select.Option value={3}>因伤缺课</Select.Option>
                  <Select.Option value={4}>其他原因缺课</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="病例类型" class={'half'}>
            {
              this.form.getFieldDecorator('diseaseType', {
                initialValue: this.currentItem.diseaseType || 1,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择病例类型！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select placeholder="请选择病例类型" allowClear>
                  <Select.Option value={1}>非传染病</Select.Option>
                  <Select.Option value={2}>传染病</Select.Option>
                  <Select.Option value={3}>伤害监测</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="学生症状" class={'half'}>
            {
              this.form.getFieldDecorator('symptomId', {
                initialValue: this.currentItem.symptomId,
                rules: [
                  {
                    required: this.form.getFieldValue('diseaseType') === 2,
                    message: '请选择病例类型！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder="请输入学生症状搜索"
                  showSearch
                  onSearch={debounce(this.onSearchForSymptom, 300)}
                  filterOption={false}
                  notFoundContent={this.symptoms.loading ? <Spin /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                >
                  {
                    this.symptoms.list.map(symptom => (
                      <Select.Option value={symptom.id}>{symptom.symptomName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="诊断详情" class={'half'}>
            {
              this.form.getFieldDecorator('diagnoseId', { initialValue: this.currentItem.diagnoseId })(
                <Select
                  placeholder="请输入诊断详情搜索"
                  showSearch
                  allowClear
                  onSearch={debounce(this.onSearchForDiagnosis, 300)}
                  filterOption={false}
                  notFoundContent={this.diagnoses.loading ? <Spin /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                >
                  {
                    this.diagnoses.list.map(symptom => (
                      <Select.Option value={symptom.id}>{symptom.diagnoseName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="发病日期" class={'half'}>
            {
              this.form.getFieldDecorator('happenTime', {
                initialValue: this.currentItem.happenTime,
                rules: [
                  {
                    required: true,
                    message: '请选择发病日期！',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker
                  placeholder="请选择发病日期"
                  valueFormat={'YYYYMMDD'}
                  style={'width: 100%'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="就诊医院" class={'half'}>
            {
              this.form.getFieldDecorator('seeDoctorHospital', { initialValue: this.currentItem.seeDoctorHospital })(
                <Input placeholder="请输入就诊医院" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="就诊日期" class={'half'}>
            {
              this.form.getFieldDecorator('seeDoctorTime', { initialValue: this.currentItem.seeDoctorTime })(
                <DatePicker
                  placeholder="请选择就诊日期"
                  valueFormat={'YYYYMMDD'}
                  style={'width: 100%'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="新发病例" class={'half'}>
            {
              this.form.getFieldDecorator('isNew', {
                initialValue: 1,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择是否是新发病例！',
                    trigger: 'change'
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          {
            this.form.getFieldValue('diseaseType') === 2
              ? (
                <Form.Item label="缺课开始日期" class={'half'}>
                  {
                    this.form.getFieldDecorator('lackOfDayTime', {
                      initialValue: this.currentItem.lackOfDayTime,
                      rules: [
                        {
                          required: true,
                          message: '请选择缺课开始日期！',
                          trigger: 'change'
                        }
                      ]
                    })(
                      <DatePicker
                        placeholder="请选择缺课开始日期"
                        valueFormat={'YYYYMMDD'}
                        style={'width: 100%'}
                      />
                    )
                  }
                </Form.Item>
              )
              : null
          }
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea placeholder="请输入描述内容" allowClear />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
