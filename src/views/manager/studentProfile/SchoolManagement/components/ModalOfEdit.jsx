import '../assets/styles/index.scss'
import { Col, Form, Input, Row, Select, Switch, Cascader } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { mapAction, mapState, dispatch } from '@/utils/store'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 1000,
        wrapClassName: 'bnm-modal-edit-user-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    }
  },
  async created() {
    await Promise.all([
      await dispatch('common', 'getAdministrativeDivision')
    ])
  },
  methods: {
    ...mapAction(['getDetail'])
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }
    const urbanRuralType = () => {
      if (this.currentItem.urbanRuralType === 1) {
        return <span>城镇</span>
      } else if (this.currentItem.urbanRuralType === 2) {
        return <span>农村</span>
      } else if (this.currentItem.urbanRuralType === 0) {
        return <span>未知</span>
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          colon={false}
        >
          <Row gutter={10}>
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item label="学校编号">
                {
                  this.form.getFieldDecorator('schoolNo', {
                    initialValue: this.currentItem.schoolNo,
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
            <Col span={12}>
              <Form.Item label="学校简称">
                {
                  this.form.getFieldDecorator('shortName', {
                    initialValue: this.currentItem.shortName
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
            <Col span={12}>
              <Form.Item label="英文简称">
                {
                  this.form.getFieldDecorator('shortNameEn	', {
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
            <Col span={12}>
              <Form.Item label="校长">
                {
                  this.form.getFieldDecorator('shortName', {
                    initialValue: this.currentItem.shortName
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
            <Col span={12}>
              <Form.Item label="办学类型">
                {
                  this.form.getFieldDecorator(
                    'schoolType',
                    { initialValue: this.currentItem.schoolTypeStr }
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
            <Col span={12}>
              <Form.Item label="办别">
                {
                  this.form.getFieldDecorator(
                    'category',
                    { initialValue: this.currentItem.category === 1 ? '公办' : '民办' }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={1}>公办</Select.Option>
                      <Select.Option value={2}>民办</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="城乡类型">
                {
                  this.form.getFieldDecorator(
                    'urbanRuralType',
                    { initialValue: urbanRuralType() }
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
            <Col span={12}>
              <Form.Item label="是否寄宿制">
                {
                  this.form.getFieldDecorator(
                    'isBoardingSchool',
                    { initialValue: this.currentItem.isBoardingSchool }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={1}>是</Select.Option>
                      <Select.Option value={0}>否</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="是否分校">
                {
                  this.form.getFieldDecorator(
                    'isBranchSchool',
                    { initialValue: this.currentItem.isBranchSchool }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={1}>是</Select.Option>
                      <Select.Option value={0}>否</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="是否校幼一体">
                {
                  this.form.getFieldDecorator(
                    'isContainKindergarten',
                    { initialValue: this.currentItem.isContainKindergarten }
                  )(
                    <Select placeholder="请选择类型">
                      <Select.Option value={1}>是</Select.Option>
                      <Select.Option value={0}>否</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="排序">
                {
                  this.form.getFieldDecorator('sortIndex', {
                    initialValue: this.currentItem.sortIndex
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
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
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
                    <Input
                      placeholder="请输入"
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
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="校徽">
                {
                  this.form.getFieldDecorator('schoolBadge', { initialValue: this.fileList })(
                    <BNUploadPictures limit={1} />
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
      </DragModal>
    )
  }
})
