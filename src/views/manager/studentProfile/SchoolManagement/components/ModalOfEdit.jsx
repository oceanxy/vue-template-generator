import '../assets/styles/index.scss'
import { Col, Form, Input, Row, Select, Switch, Cascader } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { dispatch } from '@/utils/store'
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
      isStreet: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
        }
      }
    },
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    },
    streetList() {
      return this.getState('streetList', this.moduleName)
    },
    fileList() {
      console.log('this.currentItem.schoolBadgeStr', this.currentItem.schoolBadgeStr)

      return this.currentItem.schoolBadgeStr && this.currentItem.schoolBadge
        ? [
          {
            uid: 'schoolBadge',
            key: this.currentItem.schoolBadge,
            url: this.currentItem.schoolBadgeStr,
            status: 'done',
            name: this.currentItem.schoolBadgeStr?.substring(this.currentItem.schoolBadgeStr.lastIndexOf('/') ?? '')
          }
        ] : []
    },

  },
  async created() {
    await Promise.all([
      await dispatch('common', 'getAdministrativeDivision')
    ])
  },
  methods: {
    customDataHandler(values) {
      const data = { ...values }

      data.schoolBadge = data.schoolBadge?.[0]?.response.data[0]?.key ?? this.currentItem?.schoolBadgeStr ?? ''
      // data.schoolBadge = this.currentItem?.schoolBadgeStr ?? data.schoolBadge?.[0]?.key ?? ''
      data.cityName = this.currentItem?.cityName ?? this.city?.[1]?.name ?? ''
      data.provinceName = this.currentItem?.provinceName ?? this.city?.[0]?.name ?? ''
      data.streetName = this.currentItem?.streetName ?? this.isStreet[0]?.fullName ?? ''
      data.streetId = this.currentItem?.streetId ?? data?.streetId ?? this.isStreet?.id ?? ''
      data.countyName = this.currentItem?.countyName ?? this.city?.[2]?.name ?? ''

      return data
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
    onChange(value, selectedOptions) {

      this.form.setFieldsValue({ streetId: '' })
      this.city = selectedOptions
      const countyId = selectedOptions[2].id

      this.getStreetList(countyId)

    },
    onChangeStreetId(value) {
      const isStreet = this.streetList.list.filter(item => {
        if (item.id === value) {
          return item
        }
      })

      this.isStreet = isStreet
    }
  },
  watch: {
    'currentItem.countyId'(value) {
      if (value) {
        this.getStreetList(value)
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
              <Form.Item label="校徽">
                {
                  this.form.getFieldDecorator('schoolBadge', { initialValue: this.fileList })(
                    <BNUploadPictures limit={1} onchange={this.onChangeImg} />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="学校名称">
                {
                  this.form.getFieldDecorator('fullName', {
                    initialValue: this.currentItem.fullName,
                    rules: [
                      {
                        required: true,
                        message: '请输入姓名!',
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
              <Form.Item label="学校编号">
                {
                  this.form.getFieldDecorator('schoolNo', {
                    initialValue: this.currentItem.schoolNo,
                    rules: [
                      {
                        required: true,
                        message: '请输入学校编号!',
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
              <Form.Item label="学校简称">
                {
                  this.form.getFieldDecorator('shortName', {
                    initialValue: this.currentItem.shortName,
                    rules: [
                      {
                        required: true,
                        message: '请输入学校简称!',
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
              <Form.Item label="学校英文名">
                {
                  this.form.getFieldDecorator('nameEn', {
                    initialValue: this.currentItem.nameEn
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
              <Form.Item label="英文简称">
                {
                  this.form.getFieldDecorator('shortNameEn', {
                    initialValue: this.currentItem.shortNameEn
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
              <Form.Item label="校长">
                {
                  this.form.getFieldDecorator('principal', {
                    initialValue: this.currentItem.principal
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
              <Form.Item label="学校网址">
                {
                  this.form.getFieldDecorator('schoolUrl', {
                    initialValue: this.currentItem.schoolUrl
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
              <Form.Item label="办学类型">
                {
                  this.form.getFieldDecorator(
                    'schoolType',
                    {
                      initialValue: this.currentItem.schoolType,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择办学类型!',
                          trigger: 'blur'
                        }
                      ]
                    }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={111}>幼儿园</Select.Option>
                      <Select.Option value={211}>小学</Select.Option>
                      <Select.Option value={311}>初级中学</Select.Option>
                      <Select.Option value={341}>完全中学</Select.Option>
                      <Select.Option value={365}>职业高中</Select.Option>
                      <Select.Option value={411}>大学</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="办别">
                {
                  this.form.getFieldDecorator(
                    'category',
                    {
                      initialValue: this.currentItem.category,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择办别!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={1}>公办</Select.Option>
                      <Select.Option value={2}>民办</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="城乡类型">
                {
                  this.form.getFieldDecorator(
                    'urbanRuralType',
                    {
                      initialValue: this.currentItem.urbanRuralType,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择城乡类型!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={1}>城镇</Select.Option>
                      <Select.Option value={2}>农村</Select.Option>
                      <Select.Option value={0}>未知</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="是否寄宿制">
                {
                  this.form.getFieldDecorator(
                    'isBoardingSchool',
                    {
                      initialValue: this.currentItem.isBoardingSchool,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择宿制!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={1}>是</Select.Option>
                      <Select.Option value={0}>否</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="是否分校">
                {
                  this.form.getFieldDecorator(
                    'isBranchSchool',
                    {
                      initialValue: this.currentItem.isBranchSchool,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择是否分校!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={1}>是</Select.Option>
                      <Select.Option value={0}>否</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="是否校幼一体">
                {
                  this.form.getFieldDecorator(
                    'isContainKindergarten',
                    {
                      initialValue: this.currentItem.isContainKindergarten,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择是否校幼一体!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={1}>是</Select.Option>
                      <Select.Option value={0}>否</Select.Option>
                    </Select>
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
                      onchange={this.onChange}
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="选择街道">
                {
                  this.form.getFieldDecorator(
                    'streetId',
                    {
                      initialValue: this.currentItem.streetName,
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
                        this.streetList.list?.map(item => (
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
              <Form.Item label="经度">
                {
                  this.form.getFieldDecorator('longitude', {
                    initialValue: this.currentItem.longitude
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="纬度">
                {
                  this.form.getFieldDecorator('latitude', {
                    initialValue: this.currentItem.latitude
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="描述">
                {
                  this.form.getFieldDecorator('description', {
                    initialValue: this.currentItem.description
                  })(
                    <Input.TextArea
                      placeholder="请输入"
                      autoSize={{ minRows: 4 }}
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="备注">
                {
                  this.form.getFieldDecorator('remark', {
                    initialValue: this.currentItem.remark
                  })(
                    <Input.TextArea
                      placeholder="请输入"
                      autoSize={{ minRows: 4 }}
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Col span={12}>
                <Form.Item label="排序">
                  {
                    this.form.getFieldDecorator('sortIndex', {
                      initialValue: this.currentItem.sortIndex || 0,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请输入排序!',
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
      </DragModal>
    )
  }
})
