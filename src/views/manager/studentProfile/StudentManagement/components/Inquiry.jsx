import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {

  },
  created() {
    // console.log(this.)
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
              this.form.getFieldDecorator('status', { initialValue: '' })(
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
              this.form.getFieldDecorator('gender', { initialValue: '' })(
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
              this.form.getFieldDecorator('gradeName', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  {/* {
                    this.yearList.years?.map(item => (
                      <Select.Option value={item} >{item}</Select.Option>
                    ))
                  } */}
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="班级">
            {
              this.form.getFieldDecorator('classNumber', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  {/* {
                    this.yearList.yearsTh?.map(item => (
                      <Select.Option value={item} >{item}</Select.Option>
                    ))
                  } */}
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="是否戴镜">
            {
              this.form.getFieldDecorator('isWearGlasses', { initialValue: '' })(
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
                  <Select.Option value={2}>其他角膜接触镜</Select.Option>
                </Select>
              )
            }
          </Form.Item>

          <Form.Item label="学籍所属学校">
            {
              this.form.getFieldDecorator('originalSchoolName', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  {/* {
                    this.yearList.yearsTh?.map(item => (
                      <Select.Option value={item} >{item}</Select.Option>
                    ))
                  } */}
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'民族'}>
            {
              this.form.getFieldDecorator('nation')(
                <Input placeholder={'请输入民族'} />
              )
            }
          </Form.Item>
          <Form.Item label={'姓名'}>
            {
              this.form.getFieldDecorator('fullName')(
                <Input placeholder={'请输入学生姓名'} />
              )
            }
          </Form.Item>
          <Form.Item label={'身份证号'}>
            {
              this.form.getFieldDecorator('idNumber')(
                <Input placeholder={'请输入身份证号码'} />
              )
            }
          </Form.Item>
          <Form.Item label={'学籍号'}>
            {
              this.form.getFieldDecorator('studentNumber')(
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
