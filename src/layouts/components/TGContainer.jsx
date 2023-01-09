import '../assets/styles/index.scss'
import TGBreadcrumb from '@/layouts/components/TGBreadcrumb'

export default {
  render() {
    return (
      <div class="tg-container">
        {
          !this.$route.meta.hideBreadCrumb || this.$slots.functions
            ? (
              <div class={'tg-content-title'}>
                {this.$route.meta.hideBreadCrumb ? null : <TGBreadcrumb mode={'onlyLast'} />}
                {this.$slots.functions}
              </div>
            )
            : null
        }
        <div class="tg-container-content">
          {this.$slots.inquiry || this.$slots.others}
          {
            this.$slots.chart ? (
              <div class={'tg-container-chart-container'}>
                {this.$slots.chart}
              </div>
            ) : null
          }
          <div class={'tg-container-table-container'}>
            {this.$slots.table}
            {this.$slots.pagination}
            {this.$slots.default}
          </div>
        </div>
        <div class="tg-container-modals">{this.$slots.modals}</div>
      </div>
    )
  }
}
