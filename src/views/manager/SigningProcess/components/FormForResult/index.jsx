import './assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  methods: {
    async onReSignClick() {
      this.$store.commit('setDetails', {
        moduleName: this.moduleName,
        merge: true,
        value: { signingStage: 0 }
      })

      await this.$router.push({ name: 'reSign', query: { id: this.details.id, ac: '1' } })
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
                  <div>
                    {this.details.contractAuditResult.contractName || '未获取到合同名称'}
                  </div>
                  <Button
                    type={'primary'}
                    disabled={!this.details.contractAuditResult.contractUrl}
                  >
                    <a href={this.details.contractAuditResult.contractUrl}>下载合同</a>
                  </Button>
                </div>
              </div>
            ),
            (
              <div class={'prompt not-pass'}>
                签约审核未通过
                <div class={'info-box'}>
                  <span>{this.details.contractAuditResult.auditMessage}</span>
                </div>

                <Button
                  type={'primary'}
                  onClick={this.onReSignClick}
                >
                  重新签约
                </Button>
              </div>
            )
          ][this.details.signingStatus - 2]
        }
      </div>
    )
  }
}
