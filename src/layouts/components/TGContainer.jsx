import '../assets/styles/index.scss'

export default {
  render() {
    return (
      <div class="tg-container">
        <div class="tg-container-content">
          {this.$slots.inquiry || this.$slots.others}
          <div class={'tg-container-table-container'}>
            {this.$slots.table}
            {this.$slots.pagination}
          </div>
        </div>
        <div class="tg-container-modals">{this.$slots.modals}</div>
      </div>
    )
  }
}
