/*
 * @Author: yangjialong 1476927892@qq.com
 * @Date: 2022-06-27 10:20:19
 * @LastEditors: yangjialong 1476927892@qq.com
 * @LastEditTime: 2022-06-28 18:02:01
 * @FilePath: \vue-template-generator\src\views\manager\parkInvestment\Clues\components\ModalOfDetails\components\Inquiry.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import '../index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  async created() {
    await this.getAllSiteApps()
  },
  methods: {},
  render() {
    return (
      <Form layout="inline" onSubmit={this.onSubmit} colon={false} class="tg-inquiry bn-search-form">
        <Space>
          <Form.Item>{this.form.getFieldDecorator('pageName')(<Input placeholder="企业名称" allowClear />)}</Form.Item>
          <Form.Item>
            {this.form.getFieldDecorator('appId')(
              <Select placeholder="请选择状态" allowClear>
                {this.allSiteApps.map(item => (
                  <Select.Option value={item.id}>{item.appName}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Space>
              <Button loading={this.loading} htmlType="submit" type="primary" icon="search">
                查询
              </Button>
              {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
            </Space>
          </Form.Item>
        </Space>
      </Form>
    )
  }
})
