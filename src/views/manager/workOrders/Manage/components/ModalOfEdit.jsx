import '../assets/styles/index.scss'
import { Form, Input, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { cloneDeep, debounce } from 'lodash'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-workorder-manage-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    businessSelect() {
      const temp = this.getState('businessSelect', this.moduleName)
      const index = temp.list.findIndex(item => item.id === this.currentItem.companyId)

      if (index < 0) {
        temp.list.splice(index, 1)
      }

      return temp
    },
    /**
     * 回显图片
     * @returns {*|*[]}
     */
    fileList() {
      return this.currentItem.imgList?.map((item, index) => ({
        uid: index,
        key: item.key,
        url: item.path,
        status: 'done',
        name: item.path?.substring(item.path?.lastIndexOf('/'))
      })) ?? []
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          if (this.currentItem.id) {
            await this.getBusinesses(this.currentItem.companyName)
          } else {
            await this.getBusinesses()
          }
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = cloneDeep(values)

      data.imgs = data.imgs.map(item => item?.response?.data[0]?.key ?? item.key).join()

      return data
    },
    async getDetail() {
      if (!this.currentItem.id) return

      await this.$store.dispatch('getDetails', {
        moduleName: this.moduleName,
        payload: { id: this.currentItem.id }
      })
    },
    async getBusinesses(keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'businessSelect',
        customApiName: 'getBusinessesForSelect',
        payload: { companyName: keyword }
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="报修企业">
            {
              this.form.getFieldDecorator('companyId', {
                initialValue: this.currentItem.companyId ?? undefined,
                rules: [
                  {
                    required: true,
                    message: '请选择企业!',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder={'输入企业名称搜索'}
                  showSearch
                  filterOption={false}
                  onSearch={debounce(this.getBusinesses, 300)}
                  notFoundContent={this.businessSelect.loading ? <Spin /> : undefined}
                >
                  {
                    this.businessSelect.list.map(item => (
                      <Select.Option value={item.id}>{item.companyName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="报修项">
            {
              this.form.getFieldDecorator('repairItem', {
                initialValue: this.currentItem.repairItem ?? undefined,
                rules: [
                  {
                    required: true,
                    message: '请输入报修项!',
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
          <Form.Item label="报修内容">
            {
              this.form.getFieldDecorator('description', {
                initialValue: this.currentItem.description ?? undefined,
                rules: [
                  {
                    required: true,
                    message: '请输入报修内容!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder="请输入"
                  autoSize={{ minRows: 6 }}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="现场图片">
            {
              this.form.getFieldDecorator('imgs', { initialValue: this.fileList })(
                <BNUploadPictures />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
