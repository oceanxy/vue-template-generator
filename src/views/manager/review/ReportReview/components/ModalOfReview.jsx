import DragModal from '@/components/DragModal'
import { Button, DatePicker, Descriptions, Empty, Form, Input, Radio, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { debounce } from 'lodash'
import ModalOfPotentiallyInfectedStudents from './ModalOfPotentiallyInfectedStudents'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true
      },
      visibilityFieldName: 'visibilityOfReview'
    }
  },
  computed: {
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
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit({ customApiName: 'reviewBySchoolDoctor' })
        }
      }
    }
  },
  methods: {
    /**
     * 设置状态
     * @param stateName {string} 状态名
     * @param [value=[]] {any} 状态值，默认为空数组
     */
    setState(stateName, value = []) {
      this.$store.commit('setState', {
        value: { loading: false, list: value },
        moduleName: this.moduleName,
        stateName
      })
    },
    async onSearchForSymptom(symptomName) {
      // 搜索前，先清空上一次搜索结果缓存
      this.setState('symptoms')

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
      this.setState('diagnoses')

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
        <Descriptions
          layout={'vertical'}
          bordered
          column={5}
          size={'small'}
        >
          <Descriptions.Item label={'姓名'}>{this.currentItem.studentName}</Descriptions.Item>
          <Descriptions.Item label={'性别'}>{this.currentItem.genderStr}</Descriptions.Item>
          <Descriptions.Item label={'年龄'}>{this.currentItem.age}</Descriptions.Item>
          <Descriptions.Item label={'班级'}>{this.currentItem.gradeClassStr}</Descriptions.Item>
          <Descriptions.Item label={'登记类型'}>{this.currentItem.registerType}</Descriptions.Item>
          <Descriptions.Item label={'上报时段'}>{this.currentItem.reportTimePeriod}</Descriptions.Item>
          <Descriptions.Item label={'上报日期'}>{this.currentItem.reportTimeStr}</Descriptions.Item>
          <Descriptions.Item
            label={'宿舍'}
            span={3}
          >
            <span>{this.currentItem.buildName}{this.currentItem.roomName}</span>
            <Button
              size={'small'}
              type={'danger'}
              style={`margin-left: 1ic; visibility: ${
                this.form.getFieldValue('auditDiseaseType') === 1 && this.currentItem.roomId
                  ? 'visible' : 'hidden'
              }`}
              onClick={() => this._setVisibilityOfModal(undefined, 'visibilityOfPotentiallyInfectedStudents')}
            >
              摸排病例
            </Button>
          </Descriptions.Item>
        </Descriptions>
        <Form
          class="tg-form-grid"
          colon={false}
          style={'margin-top: 2ic'}
        >
          <Form.Item
            label="病例类型"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('auditDiseaseType', {
                initialValue: 2,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择病例类型！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select placeholder="请选择病例类型">
                  <Select.Option value={1}>传染病</Select.Option>
                  <Select.Option value={2}>非传染病</Select.Option>
                  <Select.Option value={3}>伤害监测</Select.Option>
                </Select>
              )}
          </Form.Item>
          <Form.Item
            label="学生症状"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('auditSymptomId', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    message: '请选择学生症状！',
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
          <Form.Item
            label="初步诊断"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('auditDiagnoseId', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    message: '请选择初步诊断内容！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder="请输入诊断内容搜索"
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
          <Form.Item
            label="就诊时间"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('auditSeeDoctorTime', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    message: '请选择就诊时间！',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker
                  style={'width: 100%'}
                  placeholder={'请选择就诊时间'}
                  valueFormat={'YYYYMMDD'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="就诊医院"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('auditSeeDoctorHospital', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    message: '请输入就诊医院！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder={'请输入就诊医院'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="是否追踪"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('isTrace', { initialValue: 2 })(
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('remark', { initialValue: undefined })(
                <Input.TextArea
                  placeholder={'请输入审核描述'}
                  allowClear
                />
              )
            }
          </Form.Item>
        </Form>
        {
          this.form.getFieldValue('auditDiseaseType') === 1 && this.currentItem.roomId
            ? <ModalOfPotentiallyInfectedStudents modalTitle={'摸排对象'} />
            : null
        }

      </DragModal>
    )
  }
})
