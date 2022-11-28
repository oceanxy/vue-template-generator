import { Cascader, Form, Input, InputNumber, Select, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { dispatch } from '@/utils/store'
import { cloneDeep } from 'lodash'

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
    organizationTree() {
      return this.$store.state[this.moduleName].organizationTree
    },
    schoolTree() {
      return this.$store.state[this.moduleName].schoolTree
    },
    streets() {
      return this.$store.state[this.moduleName].streets
    },
    selectedSchoolsForEditModal() {
      return this.$store.state[this.moduleName].selectedSchoolsForEditModal
    },
    selectedSchools() {
      return this.selectedSchoolsForEditModal.list.map(item => item.id)
    },
    administrativeDivision() {
      return this.$store.state['common'].administrativeDivision
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({
            customDataHandler(value) {
              const data = cloneDeep(value)

              data.schoolIds = data.schoolIds.join()

              return data
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
          await Promise.all([
            this.$store.dispatch('getListWithLoadingStatus', {
              moduleName: this.moduleName,
              stateName: 'schoolTree',
              customApiName: 'getSchoolTree'
            }),
            dispatch('common', 'getAdministrativeDivision'),
            this.getSchoolsByOrganizationId(),
            this.getStreets()
          ])
        }
      }
    }
  },
  methods: {
    async onDistrictChange(value) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        customApiName: 'getStreetsByDistrictId',
        moduleName: this.moduleName,
        stateName: 'streets',
        payload: { countyId: value[2] }
      })
    },
    async getSchoolsByOrganizationId() {
      // 编辑模式
      if (this.currentItem.id) {
        const status = await this.$store.dispatch('getListWithLoadingStatus', {
          moduleName: this.moduleName,
          stateName: 'selectedSchoolsForEditModal',
          customApiName: 'getSchoolsByOrganizationId',
          payload: { organId: this.currentItem.id }
        })

        if (status) {
          this.form.setFieldsValue({ schoolIds: this.selectedSchools })
        }
      }
    },
    async getStreets() {
      if (this.currentItem.id) {
        await this.onDistrictChange([null, null, this.currentItem.countyId])
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="所属组织" class={'half'}>
            {
              this.form.getFieldDecorator('parentId', {
                initialValue: this.currentItem.parentId || this.search.parentId || undefined,
                rules: [
                  {
                    required: true,
                    message: '请选择所属组织！',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  disabled
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.organizationTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  searchPlaceholder={'请输入关键字以搜索'}
                  placeholder={'请选择所属组织'}
                  treeDefaultExpandedKeys={[this.currentItem.parentId || this.search.parentId]}
                />
              )
            }
          </Form.Item>
          <Form.Item label="组织名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入组织名称！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入组织名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="学校范围">
            {
              this.form.getFieldDecorator('schoolIds', {
                initialValue: this.currentItem.schoolIds || [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请选择学校（可多选）！',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  multiple
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.schoolTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  searchPlaceholder={'请输入学校名称搜索'}
                  placeholder={'请选择学校（可多选）'}
                  treeDefaultExpandedKeys={this.selectedSchools}
                />
              )
            }
          </Form.Item>
          <Form.Item label="地址" class={'half'}>
            {
              this.form.getFieldDecorator('areaCode', {
                initialValue: this.currentItem.provinceId && this.currentItem.cityId && this.currentItem.countyId
                  ? [
                    this.currentItem.provinceId,
                    this.currentItem.cityId,
                    this.currentItem.countyId
                  ]
                  : []
              })(
                <Cascader
                  placeholder="请选择省市区"
                  expandTrigger={'hover'}
                  allowClear
                  fieldNames={{
                    label: 'name',
                    value: 'id',
                    children: 'children'
                  }}
                  options={this.administrativeDivision}
                  onChange={this.onDistrictChange}
                />
              )
            }
          </Form.Item>
          <Form.Item label="选择街道" class={'half'}>
            {
              this.form.getFieldDecorator('streetId', { initialValue: this.currentItem.streetId || undefined })(
                <Select
                  disabled={!this.form.getFieldValue('areaCode')[2]}
                  placeholder="请选择街道"
                >
                  {
                    this.streets.list?.map(item => (
                      <Select.Option value={item.id + ''}>{item.fullName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="详细地址">
            {
              this.form.getFieldDecorator('address', { initialValue: this.currentItem.address })(
                <Input placeholder="请输入详细地址" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="组织描述">
            {
              this.form.getFieldDecorator('orgDescribe', { initialValue: this.currentItem.orgDescribe })(
                <Input.TextArea placeholder="请输入描述" allowClear />
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
                    message: '请输入排序！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber style={{ width: '100%' }} placeholder="请输入排序" />
              )
            }
          </Form.Item>
          <Form.Item
            label="状态"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('status', {
                initialValue: !isNaN(this.currentItem.status) ? this.currentItem.status === 1 : true,
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