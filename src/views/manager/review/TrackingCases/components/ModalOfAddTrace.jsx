import { Cascader, Empty, Form, Input, Select, Spin, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { debounce } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibilityFieldName: 'visibilityOfAddTrace',
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
    dormitories() {
      return this.$store.state[this.moduleName].dormitories
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
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit({
            customApiName: 'addTrackingCases',
            customDataHandler: value => {
              return {
                buildId: value.build.key,
                buildName: value.build.label,
                description: value.description,
                diagnoseId: value.diagnose.key,
                diagnoseName: value.diagnose.label,
                floorId: value.floor.key,
                floorName: value.floor.label,
                roomId: value.room.key,
                roomNo: value.room.label,
                studentStatus: value.studentStatus,
                symptomId: value.symptom.key,
                symptomName: value.symptom.label,
                traceId: this.currentItem.id
              }
            },
            done: () => {
              this.$emit('add')
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
          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'dormitories',
            customApiName: 'getRoomTreeByStudentId',
            payload: { studentId: this.currentItem.studentId }
          })
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
    },
    onDormitoryChange(value, selectedOptions) {
      this.form.setFieldsValue({
        build: { key: value[0], label: selectedOptions[0].name },
        floor: { key: value[1], label: selectedOptions[1].name },
        room: { key: value[2], label: selectedOptions[2].name }
      })
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="学生症状" class={'half'}>
            {
              this.form.getFieldDecorator('symptom', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    type: 'object',
                    message: '请选择病例类型！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder="请输入学生症状搜索"
                  showSearch
                  labelInValue
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
              this.form.getFieldDecorator('diagnose', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    type: 'object',
                    message: '请选择诊断详情！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder="请输入诊断详情搜索"
                  showSearch
                  allowClear
                  labelInValue
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
          <Form.Item label="学生宿舍" class={'half'}>
            {
              this.form.getFieldDecorator('dormitory', { initialValue: undefined })(
                <Cascader
                  showSearch
                  allowClear
                  placeholder={'请选择宿舍（可搜索）'}
                  options={this.dormitories.list}
                  onChange={this.onDormitoryChange}
                  fieldNames={{
                    children: 'children',
                    label: 'name',
                    value: 'id'
                  }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="楼栋" style={'display: none'}>
            {
              this.form.getFieldDecorator('build', { initialValue: undefined })(
                <TreeSelect
                  labelInValue
                  treeData={this.dormitories.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="楼层" style={'display: none'}>
            {
              this.form.getFieldDecorator('floor', { initialValue: undefined })(
                <TreeSelect
                  labelInValue
                  treeData={this.dormitories.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="房间" style={'display: none'}>
            {
              this.form.getFieldDecorator('room', { initialValue: undefined })(
                <TreeSelect
                  labelInValue
                  treeData={this.dormitories.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="学生状态" class={'half'}>
            {
              this.form.getFieldDecorator('studentStatus', {
                initialValue: 1
              })(
                <Select placeholder="请选择登记类型" allowClear>
                  <Select.Option value={1}>在校</Select.Option>
                  <Select.Option value={2}>居家</Select.Option>
                  <Select.Option value={3}>住院</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="追踪描述">
            {
              this.form.getFieldDecorator('description', { initialValue: undefined })(
                <Input.TextArea placeholder="请输入追踪描述内容" allowClear />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
