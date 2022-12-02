import '../assets/styles/index.scss'
import { Col, Form, Input, Row, Select, Switch, Cascader, DatePicker, InputNumber } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
// import { dispatch } from '@/utils/store'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 1200,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      city: [],
      classNumber: '',
      classList: [],
      isStreet: '',
      glassesTypeSelect: true,
      isSchool: []
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    gradeList() {
      return this.getState('gradeList', this.moduleName)
    },
    schoolAllList() {
      return this.getState('schoolAllList', this.moduleName)?.list ?? []
    },
    streetList() {
      return this.getState('streetList', this.moduleName)?.list ?? []
    },
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    },
    fileList() {
      return this.currentItem.photoStr && this.currentItem.photo
        ? [
          {
            uid: 'photo',
            key: this.currentItem.photo,
            url: this.currentItem.photoStr,
            status: 'done',
            name: this.currentItem.photoStr?.substring(this.currentItem.photoStr.lastIndexOf('/') ?? '')
          }
        ] : []
    },
    streetIdNumber() {
      if (this.currentItem.streetId) {
        return this.currentItem.streetId
      } else {
        return undefined
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
    onChangeSchoolId(value) {
      this.form.setFieldsValue({ gradeId: '' })
      this.form.setFieldsValue({ classNumber: '' })
      this.getGradeList(value)
      this.curSchool(value)
    },
    curSchool(value) {
      this.isSchool = this.schoolAllList?.filter(item => {
        if (item.id === value) {
          return item
        }
      })
    },
    async getGradeList(schoolId) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'gradeList',
        customApiName: 'getGradeListBySchoolId',
        payload: {
          schoolId
        }
      })
    },
    async getStreetList(countyId) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'streetList',
        customApiName: 'getStreetsByDistrictId',
        payload: {
          countyId
        }
      })
    },
    onChangeClassNumber(value) {
      this.classList = []
      this.form.setFieldsValue({ classNumber: '' })
      const data = this.gradeList.list.filter(item => {
        if (item.id === value) {
          return item
        }
      })

      this.classNumber = data[0].classNum
      for (let i = 0; i < this.classNumber; i++) {
        this.classList.push(i)
      }
    },
    customDataHandler(values) {
      const data = { ...values }
      const str = data.birthDate.replaceAll('-', '')

      data.birthDate = Number(str)
      data.photo = data.photo[0]?.key ?? data.photo?.[0]?.response.data[0].key ?? ''
      data.cityName = this.currentItem?.cityName ?? this.city?.[1]?.name ?? ''
      data.provinceName = this.currentItem?.provinceName ?? this.city?.[0]?.name ?? ''
      data.streetName = this.currentItem?.streetName ?? this.isStreet[0]?.fullName ?? ''
      data.streetId = this.currentItem?.streetId ?? data?.streetId.toString() ?? this.isStreet?.id ?? ''
      data.countyName = this.currentItem?.countyName ?? this.city?.[2]?.name ?? ''
      data.schoolName = this.isSchool?.[0]?.fullName ?? this.currentItem?.schoolName ?? ''
      data.isWearGlasses = data.isWearGlasses.toString() ?? this.currentItem?.isWearGlasses ?? ''
      data.leftGlassesValue = Number(data.leftGlassesValue) ?? this.currentItem?.leftGlassesValue ?? ''
      data.rightGlassesValue = Number(data.rightGlassesValue) ?? this.currentItem?.rightGlassesValue ?? ''
      data.status = data.status.toString() ?? this.currentItem?.status.toString() ?? ''

      return data
    },
    onChangeCity(value, selectedOptions) {

      this.form.setFieldsValue({ streetId: '' })
      this.city = selectedOptions
      const countyId = selectedOptions[2]?.id ?? this.currentItem.countyId

      this.getStreetList(countyId)
    },

    onChangeStreetId(value) {
      const isStreet = this.streetList?.filter(item => {
        if (item.id === value) {
          return item
        }
      })

      this.isStreet = isStreet
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    onChangeGlassesType(value) {
      if (value === 1) {
        this.glassesTypeSelect = false
      } else {
        this.form.setFieldsValue({ glassesType: '' })
        this.glassesTypeSelect = true
      }
    }
  },
  watch: {
    schoolId(value) {
      if (value) {
        this.getGradeList()
      }
    },
    'currentItem.countyId'(value) {
      if (value) {
        this.getStreetList(value)
      }
    },
    'currentItem.schoolId'(value) {
      if (value) {
        this.curSchool(value)
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          colon={false}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="照片">
                {
                  this.form.getFieldDecorator('photo', { initialValue: this.fileList })(
                    <BNUploadPictures limit={1} onchange={this.onChangeImg} />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="学籍号">
                {
                  this.form.getFieldDecorator('studentNumber', {
                    initialValue: this.currentItem.studentNumber,
                    rules: [
                      {
                        required: true,
                        message: '请输入学籍号!',
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
            </Col>
            <Col span={6}>
              <Form.Item label="学生姓名">
                {
                  this.form.getFieldDecorator('fullName', {
                    initialValue: this.currentItem.fullName,
                    rules: [
                      {
                        required: true,
                        message: '请输入学生姓名!',
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
            </Col>
            <Col span={6}>
              <Form.Item label="性别">
                {
                  this.form.getFieldDecorator(
                    'gender',
                    {
                      initialValue: this.currentItem.gender,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择性别!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select placeholder="请选择性别">
                      <Select.Option value={1}>男</Select.Option>
                      <Select.Option value={2}>女</Select.Option>
                      <Select.Option value={0}>未知</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="身份证号">
                {
                  this.form.getFieldDecorator('idNumber', {
                    initialValue: this.currentItem.idNumber,
                    rules: [
                      {
                        required: true,
                        message: '请输入身份证号!',
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
            </Col>
            <Col span={6}>
              <Form.Item label="出生日期">
                {
                  this.form.getFieldDecorator('birthDate', {
                    initialValue: this.currentItem.birthDateStr,
                    rules: [
                      {
                        required: true,
                        message: '请输入出生日期!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <DatePicker
                      placeholder={'选择出生日期'}
                      valueFormat={'YYYY-MM-DD'}
                      style="width: 100%"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="民族">
                {
                  this.form.getFieldDecorator('nation', {
                    initialValue: this.currentItem.nation
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="学籍所属学校">
                {
                  this.form.getFieldDecorator('originalSchoolId', {
                    initialValue: this.currentItem.originalSchoolId,
                    rules: [
                      {
                        required: true,
                        message: '请选择办别!',
                        trigger: ['change', 'blur']
                      }
                    ]
                  })(
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
            </Col>
            <Col span={6}>
              <Form.Item label="就读学校名称">
                {
                  this.form.getFieldDecorator('schoolId', {
                    initialValue: this.currentItem.schoolId,
                    rules: [
                      {
                        required: true,
                        message: '请选择办别!',
                        trigger: 'change'
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      placeholder={'输入学校名称'}
                      filterOption={this.filterOption}
                      mode={'default'}
                      onChange={this.onChangeSchoolId}
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
            </Col>
            <Col span={6}>
              <Form.Item label="年级">
                {
                  this.form.getFieldDecorator(
                    'gradeId',
                    {
                      initialValue: this.currentItem.gradeId,
                      rules: [
                        {
                          required: true,
                          message: '请选择年级!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select
                      placeholder="请选择年级"
                      onChange={this.onChangeClassNumber}>
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
            </Col>
            <Col span={6}>
              <Form.Item label="班级">
                {
                  this.form.getFieldDecorator(
                    'classNumber',
                    {
                      initialValue: this.currentItem.classNumber,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择班级!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select
                      placeholder="请选择班级">
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
            </Col>
            <Col span={6}>
              <Form.Item label="是否戴镜">
                {
                  this.form.getFieldDecorator(
                    'isWearGlasses',
                    {
                      initialValue: this.currentItem.isWearGlasses,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择是否戴镜!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select
                      onChange={this.onChangeGlassesType}
                      placeholder="请选择是否戴镜">
                      <Select.Option value={''}>全部</Select.Option>
                      <Select.Option value={1}>是</Select.Option>
                      <Select.Option value={0}>否</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="眼镜类型">
                {
                  this.form.getFieldDecorator(
                    'glassesType',
                    {
                      initialValue: this.currentItem.glassesType
                    }
                  )(
                    <Select
                      disabled={this.glassesTypeSelect}
                      placeholder="请选择眼镜类型">
                      <Select.Option value={''}>全部</Select.Option>
                      <Select.Option value={1}>框架眼镜</Select.Option>
                      <Select.Option value={2}>夜戴角膜塑形镜</Select.Option>
                      <Select.Option value={3}>其他角膜接触镜</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="左眼度数">
                {
                  this.form.getFieldDecorator('leftGlassesValue', {
                    initialValue: this.currentItem.leftGlassesValue
                  })(
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="右眼度数">
                {
                  this.form.getFieldDecorator('rightGlassesValue', {
                    initialValue: this.currentItem.rightGlassesValue
                  })(
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="籍贯">
                {
                  this.form.getFieldDecorator('nativePlace', {
                    initialValue: this.currentItem.nativePlace
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="家长姓名">
                {
                  this.form.getFieldDecorator('parentName', {
                    initialValue: this.currentItem.parentName
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="家长联系电话">
                {
                  this.form.getFieldDecorator('parentPhone', {
                    initialValue: this.currentItem.parentPhone
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="地址">
                {
                  this.form.getFieldDecorator('areaCode', {
                    initialValue: this.currentItem.provinceId && this.currentItem.cityId && this.currentItem.countyId
                      ? [
                        this.currentItem.provinceId,
                        this.currentItem.cityId,
                        this.currentItem.countyId
                      ]
                      : this.defaultAdministrativeDivision,
                    rules: [
                      {
                        required: true, type: 'array', message: '请选择行政区划!', trigger: 'blur'
                      }
                    ]
                  })(
                    <Cascader
                      placeholder="请选择省市区"
                      expandTrigger={'hover'}
                      allowClear
                      options={this.administrativeDivision}
                      fieldNames={{
                        label: 'name', value: 'id', children: 'children'
                      }}
                      onchange={this.onChangeCity}
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="街道">
                {
                  this.form.getFieldDecorator(
                    'streetId',
                    {
                      initialValue: this.streetIdNumber,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择街道!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select
                      onChange={this.onChangeStreetId}
                      placeholder="请选择">
                      {
                        this.streetList?.map(item => (
                          <Select.Option value={item.id} >{item.fullName}</Select.Option>
                        ))
                      }
                    </Select>
                  )
                }

              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="详细地址">
                {
                  this.form.getFieldDecorator('address', {
                    initialValue: this.currentItem.address
                  })(
                    <Input
                      placeholder="请输入详细地址"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态">
                {
                  this.form.getFieldDecorator('status', {
                    initialValue: this.currentItem.status === 1,
                    valuePropName: 'checked'
                  })(
                    <Switch />
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal >
    )
  }
})
