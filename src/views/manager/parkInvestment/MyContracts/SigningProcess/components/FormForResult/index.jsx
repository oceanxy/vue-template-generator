import './assets/styles/index.scss'
import { Button } from 'ant-design-vue'

export default {
  data() {
    return {
      status: 1
    }
  },
  render() {
    return (
      <div class={'bnm-contract-review-result-container'}>
        {
          [
            (
              <div class={'prompt under-review'}>签约审核中，请耐心等待</div>
            ),
            (
              <div class={'prompt approved'}>
                签约审核通过，合同已生成

                <div class={'info-box'}>
                  （293928D）收快递费健康大数据反馈的实际开发.PDF
                  <Button type={'primary'}>下载合同</Button>
                </div>
              </div>
            ),
            (
              <div class={'prompt not-pass'}>
                签约审核未通过
                <div class={'info-box'}>
                  <div>
                    1、名称写错了名称写错了名称写错了<br />
                    2、名称写错了名称写错了名称写错了<br />
                    3、名称写错了名称写错了名称写错了<br />
                  </div>
                </div>

                <Button type={'primary'}>更新签约</Button>
              </div>
            )
          ][this.status]
        }
      </div>
    )
  }
}
