import { Cascader, Form, Input, InputNumber, Select, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { dispatch } from '@/utils/store'
import { getStreetValueFromEvent, getStreetValueProps } from '@/utils/projectHelpers'
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
    // schoolTree() {
    //   return this.$store.state[this.moduleName].schoolTree
    // },
    streets() {
      return this.$store.state[this.moduleName].streets
    },
    // selectedSchoolsForEditModal() {
    //   return this.$store.state[this.moduleName].selectedSchoolsForEditModal
    // },
    // selectedSchools() {
    //   return this.selectedSchoolsForEditModal.list.map(item => item.id)
    // },
    administrativeDivision() {
      return this.$store.state['common'].administrativeDivision
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({
            customDataHandler: value => {
              const data = cloneDeep(value)

              data.type = this.search.type

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
            // this.$store.dispatch('getListWithLoadingStatus', {
            //   moduleName: this.moduleName,
            //   stateName: 'schoolTree',
            //   customApiName: 'getSchoolTree'
            // }),
            dispatch('common', 'getAdministrativeDivision'),
            // this.getSchoolsByOrganizationId(),
            this.getStreets(),
            this.getStreetsByDistrictId(this.currentItem.countyId || '500180')
          ])
        }
      }
    }
  },
  methods: {
    async onDistrictChange(value) {
      this.form.setFieldsValue({ street: undefined })

      if (value[2]) {
        await this.getStreetsByDistrictId(value[2])
      }
    },
    // async getSchoolsByOrganizationId() {
    //   // 编辑模式
    //   if (this.currentItem.id) {
    //     const status = await this.$store.dispatch('getListWithLoadingStatus', {
    //       moduleName: this.moduleName,
    //       stateName: 'selectedSchoolsForEditModal',
    //       customApiName: 'getSchoolsByOrganizationId',
    //       payload: { organId: this.currentItem.id }
    //     })
    //
    //     if (status) {
    //       this.form.setFieldsValue({ schoolIds: this.selectedSchools })
    //     }
    //   }
    // },
    async getStreets() {
      if (this.currentItem.id && this.currentItem.countyId) {
        await this.getStreetsByDistrictId(this.currentItem.countyId)
      }
    },
    async getStreetsByDistrictId(value) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        customApiName: 'getStreetsByDistrictId',
        moduleName: this.moduleName,
        stateName: 'streets',
        payload: { countyId: value }
      })
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          {/*<Form.Item label="所属组织" class={'half'}>*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('parentId', {*/}
          {/*      initialValue: this.currentItem.parentId || this.search.parentId || undefined,*/}
          {/*      rules: [*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: '请选择所属组织！',*/}
          {/*          trigger: 'change'*/}
          {/*        }*/}
          {/*      ]*/}
          {/*    })(*/}
          {/*      <TreeSelect*/}
          {/*        showSearch*/}
          {/*        allowClear*/}
          {/*        disabled*/}
          {/*        treeNodeFilterProp={'title'}*/}
          {/*        dropdownClassName={'tg-select-dropdown'}*/}
          {/*        treeData={this.organizationTree.list}*/}
          {/*        replaceFields={{*/}
          {/*          children: 'children',*/}
          {/*          title: 'name',*/}
          {/*          key: 'id',*/}
          {/*          value: 'id'*/}
          {/*        }}*/}
          {/*        searchPlaceholder={'请输入关键字以搜索'}*/}
          {/*        placeholder={'请选择所属组织'}*/}
          {/*        treeDefaultExpandedKeys={[this.currentItem.parentId || this.search.parentId]}*/}
          {/*      />*/}
          {/*    )*/}
          {/*  }*/}
          {/*</Form.Item>*/}
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
          <Form.Item label="状态" class={'half'}>
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
